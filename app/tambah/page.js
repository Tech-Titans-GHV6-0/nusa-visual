"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import Sidebar from "../components/Sidebar";
import { useRouter } from "next/navigation";

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
  "Permainan Tradisional",
  "Bangunan Sejarah"
];

export default function TambahPage() {
  const [form, setForm] = useState({
    title: "",
    origin: "",
    category: "",
    description: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const router = useRouter();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImage = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let imageUrl = "";
    if (imageFile) {
      const data = new FormData();
      data.append("image", imageFile);

      const uploadRes = await fetch("/api/budaya/upload", {
        method: "POST",
        body: data,
      });

      const uploadJson = await uploadRes.json();
      imageUrl = uploadJson.url;
    }

    const res = await fetch("/api/budaya", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, image: imageUrl }),
    });

    
    if (res.ok) {
      toast.success("Budaya berhasil ditambahkan!");
      setForm({ title: "", origin: "", category: "", description: "" });
      setImageFile(null);

      setTimeout(() => {
        console.log("Redirecting to home...");
        router.push("/"); 
      }, 2000);
    } else {
      toast.error("Gagal menambahkan budaya.");
    }
  };

  return (
    <div className="flex h-screen my-16 md:my-0 bg-[#B49C78]">
      <Sidebar />
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-xl mx-auto p-6 bg-white rounded-xl shadow-md mt-8 max-h-[90vh] overflow-y-auto"
      >
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-2xl font-bold text-[#433D3D] mb-6 text-center"
        >
          Tambah Budaya Nusantara
        </motion.h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <motion.input
            whileFocus={{ scale: 1.02 }}
            type="text"
            name="title"
            placeholder="Judul Budaya"
            value={form.title}
            onChange={handleChange}
            className="w-full border rounded p-2 focus:outline-[#433D3D] text-gray-700"
            required
          />

          <motion.input
            whileFocus={{ scale: 1.02 }}
            type="text"
            name="origin"
            placeholder="Asal Daerah"
            value={form.origin}
            onChange={handleChange}
            className="w-full border rounded p-2 focus:outline-[#433D3D] text-gray-700"
            required
          />

          <motion.select
            whileFocus={{ scale: 1.02 }}
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full border rounded text-gray-700 p-2"
            required
          >
            <option value="">Pilih Kategori Budaya</option>
            {categories.map((cat, i) => (
              <option key={i} value={cat}>
                {cat}
              </option>
            ))}
          </motion.select>

          <motion.textarea
            whileFocus={{ scale: 1.02 }}
            name="description"
            placeholder="Deskripsi budaya..."
            value={form.description}
            onChange={handleChange}
            rows={4}
            className="w-full border rounded p-2 focus:outline-[#433D3D] text-gray-700"
            required
          />

          <motion.input
            whileFocus={{ scale: 1.02 }}
            type="file"
            name="image"
            onChange={handleImage}
            accept="image/*"
            className="w-full border rounded p-2 text-gray-700"
          />

          {imageFile && (
            <motion.img
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              src={URL.createObjectURL(imageFile)}
              alt="Preview"
              className="w-full h-48 object-cover rounded shadow-sm"
            />
          )}

          <motion.button
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="bg-[#433D3D] w-full text-white px-4 py-2 rounded hover:bg-[#433D3D] transition"
          >
            Simpan Budaya
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}
