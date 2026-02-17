import { NextResponse } from 'next/server';
import { otpStore } from '../store';

export async function POST(req: Request) {
  try {
    const { mobile } = await req.json();
    if (!mobile) return NextResponse.json({ success: false, error: 'Mobile required' }, { status: 400 });

    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit
    const expiresAt = Date.now() + 5 * 60 * 1000; // 5 minutes
    otpStore.set(mobile, { otp, expiresAt });

    // Send via Textbelt — use configured key if present, otherwise use demo key 'textbelt'.
    // The demo key is rate-limited; for production get your own key from https://textbelt.com/
    const textbeltKey = process.env.TEXTBELT_API_KEY || process.env.NEXT_PUBLIC_TEXTBELT_API_KEY || 'textbelt';
    try {
      const resp = await fetch('https://textbelt.com/text', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: mobile, message: `Your OTP is ${otp}`, key: textbeltKey }),
      });
      const result = await resp.json();
      if (!result.success) {
        // Log OTP to console as fallback for development/testing
        // eslint-disable-next-line no-console
        console.warn('Textbelt reported failure for', mobile, result);
        console.log(`[OTP] ${mobile} -> ${otp}`);
      }
    } catch (err) {
      console.error('Textbelt send error', err);
      console.log(`[OTP] ${mobile} -> ${otp}`);
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error('Error in /api/otp/send', err);
    return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 });
  }
}

