"use client";

import axios from "axios";
import { useState, useEffect } from "react";

interface Ingredient {
  _id: string;
  name: string;
  stock: number;
  category: string;
}

export default function AdminPage() {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [updatedStocks, setUpdatedStocks] = useState<Record<string, number>>(
    {}
  );

  useEffect(() => {
    axios.get("/api/ingredients").then((res) => {
      const allIngredients: Ingredient[] = [
        ...(res.data.bases || []).map((item: Ingredient) => ({
          ...item,
          category: "Base",
        })),
        ...(res.data.sauces || []).map((item: Ingredient) => ({
          ...item,
          category: "Sauce",
        })),
        ...(res.data.cheeses || []).map((item: Ingredient) => ({
          ...item,
          category: "Cheese",
        })),
        ...(res.data.veggies || []).map((item: Ingredient) => ({
          ...item,
          category: "Veggie",
        })),
      ];

      const limitedIngredients = allIngredients.slice(0, 15); // show max 15

      setIngredients(limitedIngredients);

      const stocks: Record<string, number> = {};
      limitedIngredients.forEach((item) => {
        stocks[item._id] = item.stock;
      });
      setUpdatedStocks(stocks);
    });
  }, []);

  const handleStockChange = (id: string, value: number) => {
    setUpdatedStocks((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const saveStock = async (id: string) => {
    try {
      await axios.put("/api/ingredients/updateStock", {
        id,
        stock: updatedStocks[id],
      });
    } catch (error) {
      console.error("Error saving stock:", error);
      alert("Failed to save stock. Please try again.");
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Admin Dashboard - Inventory Management
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {ingredients.map((item) => (
          <div
            key={item._id}
            className="bg-white shadow-md rounded-xl p-4 flex flex-col gap-2 border border-gray-200"
          >
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-800">
                {item.name}
              </h2>
              <span className="text-sm text-gray-500">{item.category}</span>
            </div>

            <div className="flex items-center gap-2 mt-2">
              <input
                type="number"
                min={0}
                value={updatedStocks[item._id] ?? 0}
                onChange={(e) =>
                  handleStockChange(item._id, Number(e.target.value))
                }
                className="w-full border border-gray-300 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <button
                onClick={() => saveStock(item._id)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded-lg transition"
              >
                Save
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
