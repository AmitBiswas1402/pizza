"use client";

import axios from "axios";
import { useState, useEffect } from "react";

interface Ingredient {
  _id: string;
  name: string;
  stock: number;
}

export default function PizzaBuilderPage() {
  const [bases, setBases] = useState<Ingredient[]>([]);
  const [sauces, setSauces] = useState<Ingredient[]>([]);
  const [cheeses, setCheeses] = useState<Ingredient[]>([]);
  const [veggies, setVeggies] = useState<Ingredient[]>([]);

  const [selectedBase, setSelectedBase] = useState<string>("");
  const [selectedSauce, setSelectedSauce] = useState<string>("");
  const [selectedCheese, setSelectedCheese] = useState<string>("");
  const [selectedVeggies, setSelectedVeggies] = useState<string[]>([]);

  useEffect(() => {
    axios.get("/api/ingredients").then((res) => {
      setBases(res.data.bases);
      setSauces(res.data.sauces);
      setCheeses(res.data.cheeses);
      setVeggies(res.data.veggies);
    });
  }, []);

  const handleVeggieToggle = (veggieId: string) => {
    setSelectedVeggies((prev) =>
      prev.includes(veggieId)
        ? prev.filter((v) => v !== veggieId)
        : [...prev, veggieId]
    );
  };

  return (
    <div>
      <h1>Build your pizza</h1>

      <div>
        <label>Choose base:</label>
        <select
          value={selectedBase}
          onChange={(e) => setSelectedBase(e.target.value)}
        >
          <option value="">Select Base</option>
          {bases.map((base) => (
            <option key={base._id} value={base._id}>
              {base.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Choose Sauce:</label>
        <select
          value={selectedSauce}
          onChange={(e) => setSelectedSauce(e.target.value)}
        >
          <option value="">-- Select Sauce --</option>
          {sauces.map((sauce) => (
            <option key={sauce._id} value={sauce._id}>
              {sauce.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Choose Cheese:</label>
        <select
          value={selectedCheese}
          onChange={(e) => setSelectedCheese(e.target.value)}
        >
          <option value="">-- Select Cheese --</option>
          {cheeses.map((cheese) => (
            <option key={cheese._id} value={cheese._id}>
              {cheese.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Choose Veggies:</label>
        <div className="flex flex-wrap gap-3">
          {veggies.map((veggie) => (
            <label key={veggie._id} className="flex items-center space-x-1">
              <input
                type="checkbox"
                value={veggie._id}
                checked={selectedVeggies.includes(veggie._id)}
                onChange={() => handleVeggieToggle(veggie._id)}
              />
              <span>{veggie.name}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
