// models/Ingredient.model.ts

import mongoose, { Schema, Document, Model } from "mongoose";

export type IngredientType = "base" | "sauce" | "cheese" | "veggie";

export interface IIngredient extends Document {
  name: string;
  stock: number;
  type: IngredientType;
}

const IngredientSchema: Schema<IIngredient> = new Schema(
  {
    name: { type: String, required: true },
    stock: { type: Number, required: true },
    type: {
      type: String,
      enum: ["base", "sauce", "cheese", "veggie"],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Prevent model overwrite on hot reload
export const Ingredient: Model<IIngredient> =
  mongoose.models.Ingredient || mongoose.model<IIngredient>("Ingredient", IngredientSchema);
