'use client';

import CheckoutButton from '@/components/CheckoutButton';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function PizzaSummaryPage() {
  const [pizzaData, setPizzaData] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    // Fetch from localStorage or context, wherever you're storing pizza
    const savedPizza = localStorage.getItem('customPizza');
    if (!savedPizza) {
      router.push('/pizza/base'); // Redirect back if no pizza
    } else {
      setPizzaData(JSON.parse(savedPizza));
    }
  }, [router]);

  if (!pizzaData) return null;

  const totalAmount = 29900; // Example: ₹299 (Stripe works in paise)

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Review Your Pizza</h2>
      <div className="mb-4 space-y-2">
        <p><strong>Base:</strong> {pizzaData.base}</p>
        <p><strong>Sauce:</strong> {pizzaData.sauce}</p>
        <p><strong>Cheese:</strong> {pizzaData.cheese}</p>
        <p><strong>Veggies:</strong> {pizzaData.veggies?.join(', ')}</p>
      </div>

      <CheckoutButton
        cartItems={pizzaData}
        amount={totalAmount}
      />
    </div>
  );
}
