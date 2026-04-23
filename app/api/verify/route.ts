import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import crypto from 'crypto';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  try {
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
    const hash = '0x' + crypto.createHash('sha256').update(buffer).digest('hex');

    // Look up document by hash
    const document = await prisma.document.findUnique({
      where: { hash },
    });

    if (!document) {
      return NextResponse.json({
        found: false,
        message: 'Document not found in blockchain records',
      });
    }

    // Document found — return verification details
    return NextResponse.json({
      found: true,
      document: {
        id: document.id,
        name: document.name,
        hash: document.hash,
        verifiedOn: document.verifiedOn?.toLocaleDateString('en-US', {
          month: 'long',
          day: 'numeric',
          year: 'numeric',
        }),
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
