import { NextResponse } from 'next/server';
import { otpStore } from '../store';

export async function POST(req: Request) {
  try {
    const { mobile, otp } = await req.json();
    if (!mobile || !otp) return NextResponse.json({ success: false, error: 'Missing params' }, { status: 400 });

    const entry = otpStore.get(mobile);
    if (!entry) return NextResponse.json({ success: false, error: 'OTP not found or expired' }, { status: 400 });

    if (Date.now() > entry.expiresAt) {
      otpStore.delete(mobile);
      return NextResponse.json({ success: false, error: 'OTP expired' }, { status: 400 });
    }

    if (entry.otp !== String(otp)) {
      return NextResponse.json({ success: false, error: 'Invalid OTP' }, { status: 400 });
    }

    // Verified — remove entry
    otpStore.delete(mobile);
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error('Error in /api/otp/verify', err);
    return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 });
  }
}
