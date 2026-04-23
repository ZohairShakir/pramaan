import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import crypto from 'crypto';

export const runtime = 'nodejs';

// Ensure uploads directory exists
const uploadsDir = path.join(process.cwd(), 'public', 'uploads');

export async function POST(request: NextRequest) {
  try {
    // For now, accept form data with file info
    // In production, you'd handle actual file uploads to storage
    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const fileName = formData.get('fileName') as string | null;
    const fileSize = formData.get('fileSize') as string | null;
    const mimeType = formData.get('mimeType') as string | null;

    if (!file && !fileName) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    // Generate unique document ID
    const docId = 'v_' + crypto.randomBytes(3).toString('hex');

    // Calculate hash based on file content or generate deterministic hash
    let hash: string;
    if (file) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      hash = '0x' + crypto.createHash('sha256').update(buffer).digest('hex');
    } else if (fileName) {
      // For demo, create hash from name + timestamp
      hash = '0x' + crypto.createHash('sha256')
        .update(fileName + Date.now())
        .digest('hex');
    } else {
      return NextResponse.json(
        { error: 'Invalid file data' },
        { status: 400 }
      );
    }

    // Save file to public/uploads (optional, for demo)
    if (file && fileName) {
      try {
        await mkdir(uploadsDir, { recursive: true });
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        await writeFile(
          path.join(uploadsDir, docId + '_' + fileName),
          buffer
        );
      } catch (error) {
        console.error('Failed to save file:', error);
        // Continue without saving file
      }
    }

    // Store in database
    const document = await prisma.document.create({
      data: {
        id: docId,
        name: fileName || 'Untitled Document',
        hash: hash,
        fileUrl: file ? `/uploads/${docId}_${fileName}` : null,
        size: fileSize ? parseInt(fileSize) : null,
        mimeType: mimeType || null,
        verifiedAt: new Date(),
        verifiedOn: new Date(),
        // userId: null for now (no auth yet)
      },
    });

    return NextResponse.json({
      success: true,
      document: {
        id: document.id,
        hash: document.hash,
        name: document.name,
        date: document.createdAt.toLocaleDateString('en-US', {
          month: 'long',
          day: 'numeric',
          year: 'numeric',
        }),
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
