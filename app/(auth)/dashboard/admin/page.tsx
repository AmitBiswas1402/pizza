"use client";

import axios from "axios";
import { useState, useEffect } from "react";

interface Ingredient {
  _id: string;
  name: string;
  stock: number;
}

export default function AdminPage() {
  const [bases, setBases] = useState<Ingredient[]>([]);
  const [sauces, setSauces] = useState<Ingredient[]>([]);
  const [cheeses, setCheeses] = useState<Ingredient[]>([]);
  const [veggies, setVeggies] = useState<Ingredient[]>([]);

  const [updatedStocks, setUpdatedStocks] = useState<Record<string, number>>({});

  useEffect(() => {
    axios.get("/api/ingredients").then((res) => {
      setBases(res.data.bases);
      setSauces(res.data.sauces);
      setCheeses(res.data.cheese);
      setVeggies(res.data.veggies);

      // Initialize updatedStocks state
      const stocks: Record<string, number> = {};
      [...res.data.bases, ...res.data.sauces, ...res.data.cheese, ...res.data.veggies].forEach(
        (item: Ingredient) => {
          stocks[item._id] = item.stock;
        }
      );
      setUpdatedStocks(stocks);
    });
  }, []);

  const handleStockChange = (id: string, value: number) => {
    setUpdatedStocks((prev) => ({
      ...prev,
      [id]: value
    }))
  }

  const saveStock = async(id: string) => {
    try {
      await axios.put("/api/ingredients/updateStock", {
        id,
        stock: updatedStocks[id]
      })
    } catch (error) {
      console.error("Error saving stock:", error);
      alert("Failed to save stock. Please try again.");      
    }
  }

  const renderIngredients = (title: string, list: Ingredient[]) => (
    <section>
      <h2 className="text-xl font-semibold my-4">{title}</h2>
      {list.map((item) => (
        <div key={item._id} className="flex items-center space-x-4 mb-2">
          <span className="flex-1">{item.name}</span>
          <input
            type="number"
            min={0}
            value={updatedStocks[item._id] ?? 0}
            onChange={(e) => handleStockChange(item._id, Number(e.target.value))}
            className="w-20 border rounded px-2 py-1"
          />
          <button
            onClick={() => saveStock(item._id)}
            className="bg-blue-600 text-white px-3 py-1 rounded"
          >
            Save
          </button>
        </div>
      ))}
    </section>
  );

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard - Inventory Management</h1>
      {renderIngredients("Bases", bases)}
      {renderIngredients("Sauces", sauces)}
      {renderIngredients("Cheese", cheeses)}
      {renderIngredients("Veggies", veggies)}
    </div>
  );
}
