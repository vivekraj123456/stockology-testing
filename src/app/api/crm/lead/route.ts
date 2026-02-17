import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const data = await req.json();
    // Log to server console for debugging
    console.log('Mock CRM received lead:', data);

    return NextResponse.json({ success: true, received: data }, { status: 200 });
  } catch (err) {
    console.error('Error in mock CRM route', err);
    return NextResponse.json({ success: false, error: 'Invalid payload' }, { status: 400 });
  }
}
