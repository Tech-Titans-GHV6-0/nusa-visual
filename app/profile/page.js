"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Pencil } from "lucide-react";
import Sidebar from "../components/Sidebar";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    avatar: "",
    region: "",
    origin: "",
    interests: [],
  });

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch("/api/user/me");
      const data = await res.json();
      setUser(data);
      setFormData({
        name: data.name,
        email: data.email,
        avatar: data.avatar || "https://res.cloudinary.com/dw8akacak/image/upload/v1753406528/default_avatar_ycdtxc.png",
        region: data.region,
        origin: data.origin,
        interests: data.interests || [],
      });
    };

    fetchUser();
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAvatarChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = () => {
        setFormData({ ...formData, avatar: reader.result });
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleSave = async () => {
    await fetch("/api/user/update", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    setEditing(false);
    window.location.reload();
  };

  if (!user) return <div className="p-4">Loading...</div>;


  return (
    <div className="flex min-h-screen bg-[#433D3D] mt-12 md:mt-0">
      <Sidebar />
      <div className="flex-1 p-6 max-w-3xl mx-auto">
        <div className="flex items-center gap-4 p-4 rounded-lg shadow bg-[#E2D8CC]">
          <div className="relative">
            <Image
              src={formData.avatar}
              alt="Avatar"
              width={96}
              height={96}
              className="rounded-full object-cover aspect-square"
            />
            {editing && (
              <input
                type="file"
                accept="image/*"
                className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer text-black"
                onChange={handleAvatarChange}
              />
            )}
          </div>

          <div className="flex-1">
            <div className="text-gray-600">@{user.username}</div>
            {editing ? (
              <input
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="mt-1 border px-2 py-1 rounded w-full text-black"
              />
            ) : (
              <div className="text-xl font-semibold text-black">
                {user.name}
              </div>
            )}
          </div>

          <button
            onClick={() => {
              if (editing) handleSave();
              else setEditing(true);
            }}
            className="flex items-center gap-1 px-3 py-1 border rounded text-[#433D3D] hover:bg-[#433D3D]/80 hover:text-white"
          >
            <Pencil className="w-4 h-4" />
            {editing ? "Simpan" : "Edit"}
          </button>
        </div>

        <div className="mt-6 p-4 rounded-lg shadow bg-[#E2D8CC]">
          <h2 className="text-lg font-semibold mb-3 text-black">Information</h2>
          <div className="space-y-3">
            <div>
              <label className="block text-sm text-black">Email</label>
              {editing ? (
                <input
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="border px-2 py-1 rounded w-full text-black"
                />
              ) : (
                <div className="text-black">{user.email}</div>
              )}
            </div>
            <div>
              <label className="block text-sm text-black">Region</label>
              <div className="text-black">{user.region}</div>
            </div>
            <div>
              <label className="block text-sm text-black">Origin</label>
              <div className="text-black">{user.origin}</div>
            </div>
            <div>
              <label className="block text-sm text-black">Interest</label>
              <div className="text-black">
                {formData.interests.join(", ") || "-"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
