'use client';

import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function CheckoutButton({ cartItems, amount }: { cartItems: any, amount: number }) {
  const handleCheckout = async () => {
    const res = await fetch('/api/checkout', {
      method: 'POST',
      body: JSON.stringify({ cartItems, amount }),
    });

    const data = await res.json();
    const stripe = await stripePromise;
    stripe?.redirectToCheckout({ sessionId: data.sessionId });
  };

  return (
    <button
      onClick={handleCheckout}
      className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded"
    >
      Pay with Stripe
    </button>
  );
}
