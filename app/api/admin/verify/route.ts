import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { sendVerifiedEmail } from '@/lib/email';

export async function POST(req: Request) {
  try {
    const { userId, action } = await req.json();

    if (!userId || !action) {
      return NextResponse.json({ error: 'Missing parameters' }, { status: 400 });
    }

    const isVerified = action === 'APPROVE';

    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        isVerifiedIssuer: isVerified,
        // If rejected, we might want to reset hasSubmittedProof to let them try again
        hasSubmittedProof: isVerified ? true : false,
      },
    });

    if (isVerified && user.email) {
      try {
        await sendVerifiedEmail({
          to: user.email,
          userName: user.name || 'Partner',
        });
      } catch (emailError) {
        console.error('[ADMIN_VERIFY_EMAIL_ERROR]', emailError);
      }
    }

    return NextResponse.json({ 
      message: `User ${isVerified ? 'verified' : 'rejected'} successfully`,
      user 
    });
  } catch (error) {
    console.error('[ADMIN_VERIFY_ERROR]', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
