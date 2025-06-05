import { connectToDB } from "@/lib/db/connectDB";
import Ingredient from "@/models/Ingredient.model";
import { NextResponse } from "next/server";

export async function GET() {
    await connectToDB();
    const bases = await Ingredient.find({ type: "base" });
    return NextResponse.json(bases)
}

export async function POST(req: Request) {
    const body = await req.json();
    await connectToDB();
    const created = await Ingredient.create({...body, type: 'base'});
    return NextResponse.json(created, { status: 201 });
}