import { Schema, Document, models, model } from "mongoose";

// 1. Define interface
export interface IIngredient extends Document {
  name: string;
  stock: number;
  category: "base" | "sauce" | "cheese" | "veggie";
}

// 2. Define schema
const IngredientSchema = new Schema<IIngredient>({
  name: { type: String, required: true },
  stock: { type: Number, required: true },
  category: { type: String, required: true },
});

// 3. Export model
const Ingredient =
  models.Ingredient || model<IIngredient>("Ingredient", IngredientSchema);
export default Ingredient;
