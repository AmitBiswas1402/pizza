import { connectToDB } from "@/lib/db/connectDB";
import { Ingredient } from "@/models/Ingredient.model";
import { NextResponse } from "next/server";

export async function GET() {
    await connectToDB();
    const cheese = await Ingredient.find({ type: "cheese" });
    return NextResponse.json(cheese);
}

export async function POST(req: Request) {
    const body = await req.json();
    await connectToDB();
    const created = await Ingredient.create({ ...body, type: 'cheese' });
    return NextResponse.json(created, { status: 201 });
}