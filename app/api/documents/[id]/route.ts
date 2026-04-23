import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const runtime = 'nodejs';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const document = await prisma.document.findUnique({
      where: { id },
    });

    if (!document) {
      return NextResponse.json(
        { status: 'not_found', error: 'Document not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      status: 'verified',
      document: {
        id: document.id,
        name: document.name,
        hash: document.hash,
        fileUrl: document.fileUrl,
        size: document.size,
        mimeType: document.mimeType,
        verifiedAt: document.verifiedAt,
        verifiedOn: document.verifiedOn,
      },
    });
  } catch (error) {
    console.error('Error fetching document:', error);
    return NextResponse.json(
      { status: 'error', error: 'Failed to fetch document' },
      { status: 500 }
    );
  }
}
