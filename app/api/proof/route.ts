import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import crypto from 'crypto';
import { getServerSession } from 'next-auth';

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Calculate SHA-256 hash
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const hash = crypto.createHash('sha256').update(buffer).digest('hex');

    // Create record in database
    const document = await prisma.document.create({
      data: {
        name: file.name,
        hash: hash,
        size: file.size,
        mimeType: file.type,
        verifiedOn: new Date(),
        userId: (session.user as any)?.id,
      },
    });

    return NextResponse.json({
      id: document.id,
      hash: document.hash,
      message: 'Document anchored successfully'
    });
  } catch (error) {
    console.error('Error anchoring document:', error);
    return NextResponse.json(
      { error: 'Failed to anchor document proof' },
      { status: 500 }
    );
  }
}
