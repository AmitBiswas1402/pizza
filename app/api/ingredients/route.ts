import { connectToDB } from "@/lib/db/connectDB";
import Ingredient from "@/models/Ingredient.model";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectToDB();

    const ingredients = await Ingredient.find();
    
    console.log("Fetched ingredients from DB:", ingredients);

    const grouped = {
      bases: ingredients.filter((i) => i.category === "base") || [],
      sauces: ingredients.filter((i) => i.category === "sauce") || [],
      cheeses: ingredients.filter((i) => i.category === "cheese") || [],
      veggies: ingredients.filter((i) => i.category === "veggie") || [],
    };

    return NextResponse.json(grouped, { status: 200 });
  } catch (error) {
    console.error("Error fetching ingredients:", error);
    return NextResponse.json(
      { error: "Failed to fetch ingredients" },
      { status: 500 }
    );
  }
}
