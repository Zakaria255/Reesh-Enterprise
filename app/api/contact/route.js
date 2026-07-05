import { NextResponse } from 'next/server';

// Basic email shape check.
const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }

  const { name, email, message } = body || {};

  if (!name || !email || !message) {
    return NextResponse.json({ error: 'Please fill in your name, email, and message.' }, { status: 400 });
  }
  if (!isEmail(email)) {
    return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 });
  }

  // Compose a lead payload.
  const lead = {
    name: String(name).slice(0, 200),
    email: String(email).slice(0, 200),
    phone: String(body.phone || '').slice(0, 60),
    service: String(body.service || '').slice(0, 120),
    budget: String(body.budget || '').slice(0, 60),
    message: String(message).slice(0, 4000),
    receivedAt: new Date().toISOString(),
  };

  // Delivery: if a webhook / email service is configured via env, forward the lead.
  // Otherwise we accept it (the UI also offers a WhatsApp fallback) and log server-side.
  const endpoint = process.env.CONTACT_WEBHOOK_URL;
  if (endpoint) {
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(lead),
      });
      if (!res.ok) throw new Error('Delivery failed');
    } catch {
      return NextResponse.json(
        { error: 'We could not send your request right now. Please message us on WhatsApp.' },
        { status: 502 }
      );
    }
  } else {
    // No delivery service configured yet — record for now.
    console.info('[reesh:contact] new lead', lead);
  }

  return NextResponse.json({ ok: true });
}
