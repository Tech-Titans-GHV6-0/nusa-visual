"use client";
import { useState } from "react";
import toast from "react-hot-toast";

export default function InterestModal({ onClose }) {
  const interests = [
    "Makanan Tradisional",
    "Pakaian Adat",
    "Tarian Daerah",
    "Alat Musik Tradisional",
    "Upacara Adat",
    "Legenda & Cerita Rakyat",
    "Festival Budaya",
    "Kerajinan Tangan",
    "Rumah Adat",
    "Permainan Tradisional",
    "Bangunan Sejarah"
  ];

  const [selected, setSelected] = useState([]);

  const toggleInterest = (interest) => {
    if (selected.includes(interest)) {
      setSelected(selected.filter((i) => i !== interest));
    } else {
      setSelected([...selected, interest]);
    }
  };

  const handleSubmit = async () => {
    try {
      const res = await fetch("/api/interests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ interests: selected }),
      });

      if (res.ok) {
        toast.success("Your interest has been successfully saved!");
        onClose();
      } else {
        toast.error("An error occurred on the server.");
      }
    } catch (err) {
      console.error("Error saving interests:", err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-xl w-[90%] max-w-2xl max-h-[90vh] overflow-y-auto shadow-lg relative">
        <h2 className="text-2xl font-bold mb-2 text-center text-[#433D3D]">
          Jelajahi Warisan Budaya Nusantara
        </h2>
        <p className="text-sm mb-5 text-center text-gray-600">
          Pilih tema budaya yang paling kamu minati.
        </p>

        <div className="flex flex-wrap gap-2 justify-center mb-6">
          {interests.map((interest) => (
            <button
              key={interest}
              className={`px-4 py-2 rounded-full border transition ${
                selected.includes(interest)
                  ? "bg-[#433D3D] text-white border-[#433D3D]"
                  : "border-gray-400 text-gray-700 hover:bg-gray-100"
              }`}
              onClick={() => toggleInterest(interest)}
            >
              {interest}
            </button>
          ))}
        </div>

        <button
          onClick={handleSubmit}
          className="w-full py-2 rounded-md bg-[#433D3D] hover:bg-[#E2D8CC] hover:text-[#433D3D] text-white font-semibold transition"
        >
          Lanjutkan Eksplorasi
        </button>
      </div>
    </div>
  );
}
