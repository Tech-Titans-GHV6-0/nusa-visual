// CategoryFilter.jsx
"use client";

import { useState, useEffect } from "react";

const categories = [
  "Makanan Tradisional",
  "Pakaian Adat",
  "Tarian Daerah",
  "Alat Musik Tradisional",
  "Upacara Adat",
  "Bahasa Daerah",
  "Legenda & Cerita Rakyat",
  "Festival Budaya",
  "Kerajinan Tangan",
  "Rumah Adat",
];

export default function CategoryFilter({ onChange }) {
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleSelect = (category) => {
    const newValue = selectedCategory === category ? "" : category;
    setSelectedCategory(newValue);
    onChange(newValue); 
  };

  return (
    <div className="flex overflow-x-auto gap-2 p-2 mb-4">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => handleSelect(category)}
          className={`whitespace-nowrap border px-4 py-2 rounded-full text-sm font-medium ${
            selectedCategory === category
              ? "bg-[#433D3D] text-white border-[#433D3D]"
              : "bg-white text-[#433D3D] border-gray-300 hover:bg-gray-100"
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
