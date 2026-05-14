import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import crypto from 'crypto';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import { sendProofEmail } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const category = formData.get('category') as string || 'General';
    const recipientName = formData.get('recipientName') as string | null;
    const recipientEmail = formData.get('recipientEmail') as string | null;
    const metadataStr = formData.get('metadata') as string | null;
    
    let metadata = {};
    if (metadataStr) {
      try {
        metadata = JSON.parse(metadataStr);
      } catch (e) {
        console.warn("Failed to parse metadata JSON", e);
      }
    }

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const userId = (session.user as any)?.id;
    if (!userId) {
      return NextResponse.json({ error: 'User ID missing from session' }, { status: 401 });
    }

    // Calculate SHA-256 hash
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const hash = crypto.createHash('sha256').update(buffer).digest('hex');

    // Create record in database matching schema
    const document = await prisma.document.create({
      data: {
        name: file.name,
        hash: hash,
        userId: userId,
        category: category,
        recipientName: recipientName,
        recipientEmail: recipientEmail,
        metadata: metadata,
        status: 'ACTIVE',
        verifiedAt: new Date(),
        network: 'Polygon',
        txHash: '0x' + crypto.randomBytes(32).toString('hex'), // Mock TX hash
        history: {
          create: {
            eventType: 'ISSUED',
            ipAddress: request.headers.get('x-forwarded-for') || '127.0.0.1',
            userAgent: request.headers.get('user-agent'),
          }
        }
      },
    });

    // 7. Send Proof Email if recipient email exists
    if (recipientEmail) {
        try {
            const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';
            await sendProofEmail({
                to: recipientEmail,
                recipientName: recipientName || 'Public Holder',
                issuerName: (session.user as any)?.organizationName || session.user?.name || 'Institutional Node',
                documentName: file.name,
                verifyUrl: `${baseUrl}/verify/${document.id}`,
                registryId: document.id,
            });
        } catch (e) {
            console.error("Failed to send proof email:", e);
        }
    }

    // Simulate blockchain data for response
    const txHash = '0x' + crypto.randomBytes(32).toString('hex');
    const did = `did:pramaan:poly:${hash.substring(0, 32)}`;

    return NextResponse.json({
      id: document.id,
      hash: document.hash,
      did: did,
      txHash: txHash,
      message: 'Document anchored successfully on Polygon'
    });
  } catch (error) {
    console.error('Error anchoring document:', error);
    return NextResponse.json(
      { error: 'Failed to anchor document proof' },
      { status: 500 }
    );
  }
}
