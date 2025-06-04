import { connectToDB } from "@/lib/db/connectDB";
import { Ingredient } from "@/models/Ingredient.model";
import { NextResponse } from "next/server";

export async function GET() {
    await connectToDB();
    const sauces = await Ingredient.find({ type: "sauce" });
    return NextResponse.json(sauces);
}

export async function POST(req: Request) {
    const body = await req.json();
    await connectToDB();
    const created = await Ingredient.create({ ...body, type: 'sauce' });
    return NextResponse.json(created, { status: 201 });
}