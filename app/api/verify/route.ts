import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import crypto from 'crypto';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  try {
    let hash = '';
    
    // Check content type
    const contentType = request.headers.get('content-type') || '';
    
    if (contentType.includes('application/json')) {
      const body = await request.json();
      hash = body.hash;
    } else {
      const formData = await request.formData();
      const file = formData.get('file') as File | null;

      if (!file) {
        return NextResponse.json(
          { error: 'No file provided' },
          { status: 400 }
        );
      }

      // Calculate SHA-256 hash of the file
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      hash = crypto.createHash('sha256').update(buffer).digest('hex');
    }

    if (!hash) {
      return NextResponse.json({ error: 'No hash provided' }, { status: 400 });
    }

    // Look up document by hash
    // Try both with and without 0x prefix to maintain compatibility with legacy records
    let document = await prisma.document.findFirst({
      where: {
        OR: [
          { hash: hash },
          { hash: hash.replace(/^0x/, '') },
          { hash: '0x' + hash.replace(/^0x/, '') }
        ]
      },
    });

    if (!document) {
      return NextResponse.json({
        found: false,
        message: 'Document not found in blockchain records',
      });
    }

    // Document found — return verification details
    
    // Update verification count and log event
    await prisma.document.update({
      where: { id: document.id },
      data: {
        verificationCount: { increment: 1 },
        history: {
          create: {
            eventType: 'VERIFIED',
            ipAddress: request.headers.get('x-forwarded-for') || '127.0.0.1',
            userAgent: request.headers.get('user-agent'),
          }
        }
      }
    });

    return NextResponse.json({
      found: true,
      document: {
        id: document.id,
        name: document.name,
        hash: document.hash,
        verifiedAt: document.verifiedAt,
        status: document.status,
        verificationUrl: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/verify/${document.id}`,
      },
    });
  } catch (error) {
    console.error('Error verifying document:', error);
    return NextResponse.json(
      { error: 'Failed to verify document' },
      { status: 500 }
    );
  }
}
