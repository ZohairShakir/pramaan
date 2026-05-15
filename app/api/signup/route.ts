import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { sendWelcomeEmail } from '@/lib/email';
import { rateLimit } from '@/lib/ratelimit';

export async function POST(req: Request) {
  try {
    const ip = req.headers.get('x-forwarded-for') || '127.0.0.1';
    
    // Rate Limit: 5 signups per 15 minutes per IP
    const { success } = await rateLimit(`signup_${ip}`, 5, 900000);
    if (!success) {
      return NextResponse.json({ 
        error: 'Too many registration attempts. Please try again in 15 minutes.' 
      }, { status: 429 });
    }

    const { name, email, password, hasSubmittedProof } = await req.json();
    console.log(`[SIGNUP_API] Attempting registration for: ${email}`);

    if (!name || !email || !password) {
      console.warn(`[SIGNUP_API] Registration failed: Missing fields`);
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Check if user already exists
    console.log(`[SIGNUP_API] Checking for existing identity...`);
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      console.warn(`[SIGNUP_API] Registration failed: User ${email} already exists`);
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 400 }
      );
    }

    // Hash password
    console.log(`[SIGNUP_API] Encrypting credentials...`);
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    console.log(`[SIGNUP_API] Anchoring identity to database...`);
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        hasSubmittedProof: !!hasSubmittedProof,
      },
    });
    
    console.log(`[SIGNUP_API] ✅ Identity anchored. UserID: ${user.id}`);
    
    // Send Welcome Email
    try {
      console.log(`[SIGNUP_API] Dispatching Welcome sequence...`);
      await sendWelcomeEmail({ to: email, userName: name });
    } catch (e) {
      console.error("[SIGNUP_API] ❌ Welcome email failed:", e);
      // Don't fail the whole registration if email fails
    }

    return NextResponse.json(
      { message: 'User created successfully', user: { id: user.id, email: user.email } },
      { status: 201 }
    );
  } catch (error) {
    console.error('[SIGNUP_API] ❌ CRITICAL ERROR:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred during registration' },
      { status: 500 }
    );
  }
}
