import { connectToDB } from "@/lib/db/connectDB";
import Ingredient from "@/models/Ingredient.model";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectToDB();

    const ingredients = await Ingredient.find();

    const grouped = {
      bases: ingredients.filter((i) => i.category === "base"),
      sauces: ingredients.filter((i) => i.category === "sauce"),
      cheeses: ingredients.filter((i) => i.category === "cheese"),
      veggies: ingredients.filter((i) => i.category === "veggie"),
    };

    return NextResponse.json(grouped);
  } catch (error) {
    console.error("Error fetching ingredients:", error);
    return NextResponse.json(
      { error: "Failed to fetch ingredients" },
      { status: 500 }
    );
  }
}
