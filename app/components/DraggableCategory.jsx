"use client";

import { motion } from "framer-motion";
import { useRef, useState, useEffect } from "react";

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

export default function DraggableCategory({ onChange, selected }) {
  const containerRef = useRef(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (containerRef.current) {
      const scrollWidth = containerRef.current.scrollWidth;
      const offsetWidth = containerRef.current.offsetWidth;
      setWidth(scrollWidth - offsetWidth);
    }
  }, []);

  return (
    <div className="overflow-hidden p-2 mb-4">
      <motion.div
        ref={containerRef}
        className="flex gap-2 cursor-grab active:cursor-grabbing select-none"
        drag="x"
        dragConstraints={{ left: -width, right: 0 }}
        whileTap={{ cursor: "grabbing" }}
      >
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onChange(category)}
            className={`whitespace-nowrap border px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
              selected === category
                ? "bg-[#433D3D] text-white border-[#B49C78]"
                : "bg-white text-[#433D3D] hover:border hover:border-[#B49C78] hover:bg-[#433D3D] hover:text-white"
            }`}
          >
            {category}
          </button>
        ))}
      </motion.div>
    </div>
  );
}
