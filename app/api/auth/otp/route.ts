import { NextResponse } from 'next/server';
import { sendOTPEmail } from '@/lib/email';

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // Generate a 6-digit OTP
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();

    // In a real production app, you would store this OTP in Redis or Database 
    // with an expiry time to verify it later. For now, we are sending it live.
    
    console.log(`[OTP_API] Generating code ${otpCode} for ${email}`);
    
    const result = await sendOTPEmail({ to: email, otpCode });

    if (result.error) {
      return NextResponse.json({ error: 'Failed to send OTP email' }, { status: 500 });
    }

    // We return the OTP in the response for this demo so the user can actually use it
    // In production, you would NEVER return the OTP to the client.
    return NextResponse.json({ 
      message: 'OTP sent successfully',
      code: otpCode 
    });
  } catch (error) {
    console.error('OTP API Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
