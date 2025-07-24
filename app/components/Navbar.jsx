"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClickSign = () =>
    toast("Welcome to Nusa Visual!", {
      icon: "🙏",
      style: {
        borderRadius: "10px",
        background: "#fff",
        color: "#333",
      },
      duration: 3000,
    });

  return (
    <nav
      className={`fixed top-0 left-0 right-0 px-5 py-4 transition-all duration-300 ease-in-out z-50 bg-black/70 backdrop-blur-md shadow-lg mt-3 rounded-full mx-auto max-w-4xl`}
    >
      <div
        className={`flex justify-between items-center ${
          scrolled ? "max-w-4xl mx-auto rounded-full px-4" : "w-full"
        }`}
      >
        <Link href="/">
          <img
            // src=""
            alt="Logo Nusa Visual"
            width={120}
            height={40}
            priority
          />
        </Link>

        <Link href="/register" onClick={handleClickSign}>
          <button className="bg-[#4682A9] hover:text-[#4682A9] hover:bg-white text-white px-4 py-2 rounded-full cursor-pointer">
            Register
          </button>
        </Link>

        <Toaster position="top-center" reverseOrder={false} />
      </div>
    </nav>
  );
}
