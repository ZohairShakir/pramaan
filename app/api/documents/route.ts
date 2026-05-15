import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import crypto from 'crypto';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import { rateLimit } from '@/lib/ratelimit';

// Ensure uploads directory exists
const uploadsDir = path.join(process.cwd(), 'public', 'uploads');

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = (session.user as any)?.id;
    const ip = request.headers.get('x-forwarded-for') || '127.0.0.1';

    // Rate Limiting: 10 docs per minute per user/IP
    const { success, remaining } = await rateLimit(`doc_create_${userId || ip}`, 10, 60000);
    if (!success) {
      return NextResponse.json({ 
        error: 'Too many requests. Please wait before creating more document proofs.' 
      }, { 
        status: 429,
        headers: { 'X-RateLimit-Remaining': remaining.toString() }
      });
    }

    // Strict validation: Only verified issuers can anchor documents
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { isVerifiedIssuer: true }
    });

    if (!user?.isVerifiedIssuer) {
      return NextResponse.json(
        { error: 'Identity validation required. Please submit your institutional documents for verification in your profile before issuing proofs.' },
        { status: 403 }
      );
    }

    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const category = formData.get('category') as string || 'General';
    const recipientName = formData.get('recipientName') as string | null;
    const recipientEmail = formData.get('recipientEmail') as string | null;
    const metadataStr = formData.get('metadata') as string | null;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // 1. Media and Size Limiting (Production Hardening)
    const allowedTypes = [
        'application/pdf', 
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 
        'image/jpeg', 
        'image/png'
    ];
    const maxSize = 7 * 1024 * 1024; // 7MB

    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: 'Invalid format. Allowed: PDF, DOCX, JPEG, PNG.' }, { status: 400 });
    }
    if (file.size > maxSize) {
      return NextResponse.json({ error: 'file is too big' }, { status: 400 });
    }

    // Calculate SHA-256 hash
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const hash = '0x' + crypto.createHash('sha256').update(buffer).digest('hex');

    // Save file to public/uploads (optional, for demo)
    let fileUrl = null;
    try {
      await mkdir(uploadsDir, { recursive: true });
      const fileName = `${Date.now()}_${file.name.replace(/\s+/g, '_')}`;
      await writeFile(
        path.join(uploadsDir, fileName),
        buffer
      );
      fileUrl = `/uploads/${fileName}`;
    } catch (error) {
      console.error('Failed to save file:', error);
    }

    // Store in database matching schema.prisma
    const document = await prisma.document.create({
      data: {
        name: file.name,
        hash: hash,
        userId: userId,
        category: category,
        recipientName: recipientName,
        recipientEmail: recipientEmail,
        metadata: metadataStr ? JSON.parse(metadataStr) : {},
        status: 'ACTIVE',
        verifiedAt: new Date(),
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // Default expiry: 7 days
        network: 'Polygon',
        txHash: '0x' + crypto.randomBytes(32).toString('hex'), // Mock TX hash
      },
    });

    // Log the creation event
    await prisma.verificationEvent.create({
      data: {
        documentId: document.id,
        eventType: 'ISSUED',
        ipAddress: request.headers.get('x-forwarded-for') || '127.0.0.1',
        userAgent: request.headers.get('user-agent'),
      }
    });

    return NextResponse.json({
      success: true,
      document: {
        id: document.id,
        hash: document.hash,
        name: document.name,
        createdAt: document.createdAt,
        verificationUrl: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/verify/${document.id}`,
      },
    });
  } catch (error) {
    console.error('Error creating document:', error);
    return NextResponse.json(
      { error: 'Failed to create document proof' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = (session.user as any)?.id;

    const documents = await prisma.document.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      include: {
        history: {
          orderBy: { timestamp: 'desc' },
          take: 5
        }
      }
    });

    // Calculate stats
    const total = documents.length;
    const verified = documents.filter(d => d.status === 'ACTIVE').length;
    const revoked = documents.filter(d => d.status === 'REVOKED').length;
    const suspended = documents.filter(d => d.status === 'SUSPENDED').length;
    const totalVerifications = documents.reduce((sum, d) => sum + d.verificationCount, 0);

    return NextResponse.json({
      documents,
      stats: {
        total,
        verified,
        revoked,
        suspended,
        totalVerifications,
      }
    });
  } catch (error) {
    console.error('Error fetching documents:', error);
    return NextResponse.json(
      { error: 'Failed to fetch documents' },
      { status: 500 }
    );
  }
}