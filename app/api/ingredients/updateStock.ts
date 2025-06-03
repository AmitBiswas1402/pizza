import { connectToDB } from "@/lib/db/connectDB";
import { Ingredient } from "@/models/Ingredient.model";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "PUT") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    await connectToDB();
    const { id, stock } = req.body;

    const ingredient = await Ingredient.findById(id);
    if (!ingredient) {
      return res.status(404).json({ message: "Ingredient not found" });
    }

    ingredient.stock = stock;
    await ingredient.save();

    res.status(200).json({ message: "Stock updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
    console.error("Error updating stock:", error);
  }
}