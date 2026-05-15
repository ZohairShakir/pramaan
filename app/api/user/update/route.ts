import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { name, organizationName, image, hasSubmittedProof } = await req.json();
    const userId = (session.user as any).id;

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        name: name || undefined,
        organizationName: organizationName || undefined,
        image: image || undefined,
        hasSubmittedProof: hasSubmittedProof !== undefined ? hasSubmittedProof : undefined,
      },
    });

    return NextResponse.json({ 
      message: 'Profile updated successfully',
      user: {
        name: updatedUser.name,
        organizationName: updatedUser.organizationName,
        image: updatedUser.image,
        hasSubmittedProof: updatedUser.hasSubmittedProof
      }
    });
  } catch (error) {
    console.error('[USER_UPDATE_ERROR]', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
