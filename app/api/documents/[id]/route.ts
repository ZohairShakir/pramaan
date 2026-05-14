import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';

export const runtime = 'nodejs';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const document = await prisma.document.findUnique({
      where: { id },
      include: {
        history: {
          orderBy: {
            timestamp: 'desc'
          }
        }
      }
    });

    if (!document) {
      return NextResponse.json(
        { status: 'not_found', error: 'Document not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      status: 'success',
      document: {
        id: document.id,
        name: document.name,
        hash: document.hash,
        category: document.category,
        recipientName: document.recipientName,
        recipientEmail: document.recipientEmail,
        metadata: document.metadata,
        verifiedAt: document.verifiedAt,
        status: document.status,
        createdAt: document.createdAt,
        verificationCount: document.verificationCount,
        revokedAt: document.revokedAt,
        history: document.history
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

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const { action, eventData } = await request.json();

    if (!action || !['REVOKE', 'RESTORE'].includes(action)) {
      return NextResponse.json(
        { error: 'Invalid action' },
        { status: 400 }
      );
    }

    const document = await prisma.document.findUnique({
      where: { id },
    });

    if (!document) {
      return NextResponse.json(
        { error: 'Document not found' },
        { status: 404 }
      );
    }

    // Check if user owns this document
    if (document.userId !== (session.user as any)?.id) {
      return NextResponse.json(
        { error: 'Forbidden' },
        { status: 403 }
      );
    }

    const newStatus = action === 'REVOKE' ? 'REVOKED' : 'ACTIVE';

    const updatedDocument = await prisma.document.update({
      where: { id },
      data: {
        status: newStatus,
        revokedAt: action === 'REVOKE' ? new Date() : null,
      },
    });

    // Create verification event
    await prisma.verificationEvent.create({
      data: {
        documentId: document.id,
        eventType: action,
        ipAddress: request.headers.get('x-forwarded-for') || '127.0.0.1',
        userAgent: request.headers.get('user-agent'),
      }
    });

    return NextResponse.json({
      status: 'success',
      document: updatedDocument,
    });
  } catch (error) {
    console.error('Error updating document:', error);
    return NextResponse.json(
      { error: 'Failed to update document' },
      { status: 500 }
    );
  }
}