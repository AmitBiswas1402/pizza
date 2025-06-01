import { NextResponse } from 'next/server';
import { connectToDB } from '@/lib/db/connectDB';
import PizzabaseModel from '@/models/Pizzabase.model';
import SauceModel from '@/models/Sauce.model';
import CheeseModel from '@/models/Cheese.model';
import VeggieModel from '@/models/Veggie.model';

export async function GET() {
  await connectToDB();

  await PizzabaseModel.insertMany([
    { name: 'Thin Crust' },
    { name: 'Cheese Burst' },
    { name: 'Pan Pizza' },
    { name: 'Wheat Base' },
    { name: 'Stuffed Crust' },
  ]);

  await SauceModel.insertMany([
    { name: 'Tomato' },
    { name: 'BBQ' },
    { name: 'White Garlic' },
    { name: 'Pesto' },
    { name: 'Spicy Marinara' },
  ]);

  await CheeseModel.insertMany([
    { name: 'Mozzarella' },
    { name: 'Cheddar' },
    { name: 'Parmesan' },
    { name: 'Goat Cheese' },
    { name: 'Vegan Cheese' },
  ]);

  await VeggieModel.insertMany([
    { name: 'Capsicum' },
    { name: 'Mushroom' },
    { name: 'Olives' },
    { name: 'Corn' },
    { name: 'Onion' },
    { name: 'Tomato' },
    { name: 'Spinach' },
  ]);

  return NextResponse.json({ message: 'Ingredients Seeded ✅' });
}
