import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-05-28.basil',
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: NextRequest) {
  const buf = await req.arrayBuffer();
  const body = Buffer.from(buf).toString('utf-8');
  const sig = req.headers.get('stripe-signature')!;
  
  let event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err: any) {
    return new NextResponse(`Webhook error: ${err.message}`, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    // TODO: Store confirmed order in DB here
    console.log('✅ Payment successful', session);
  }

  return new NextResponse('ok', { status: 200 });
}
