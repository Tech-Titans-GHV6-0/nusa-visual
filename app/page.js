"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Sidebar from "./components/Sidebar";
import { useSession } from "next-auth/react";
import InterestModal from "./components/InterestModal";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import CultureCard from "./components/CultureCard";
import Navbar from "./components/Navbar";
import GreetingCard from "./components/GreetingCard";
import CategoryFilter from "./components/CategoryFilter";

export default function HomePage() {
  const { data: session, status } = useSession();
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [filteredData, setFilteredData] = useState(data);
  const [category, setCategory] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchResults = async () => {
      const url = new URL("/api/search", window.location.origin);
      if (category) url.searchParams.set("category", category);

      const res = await fetch(url);
      const data = await res.json();
      setResults(data);
    };

    fetchResults();
  }, [category]);

  useEffect(() => {
    if (selectedCategory === "") {
      setFilteredData(data);
    } else {
      setFilteredData(
        data.filter((item) => item.category === selectedCategory)
      );
    }
  }, [selectedCategory, data]);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category === selectedCategory ? "" : category); // toggle
  };

  useEffect(() => {
    fetch("/api/budaya")
      .then((res) => res.json())
      .then(setData);
  }, []);

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

  useEffect(() => {
    const checkInterest = async () => {
      if (status === "authenticated") {
        const res = await fetch("/api/check-interests");

        if (!res.ok) {
          console.error("Response status:", res.status);
          const text = await res.text();
          console.error("Response body:", text);
          return;
        }

        try {
          const data = await res.json();
          if (!data.hasInterests) {
            setShowModal(true);
          }
        } catch (e) {
          console.error("Gagal parse JSON:", e);
        }
      }
    };

    checkInterest();
  }, [status]);

  return (
    <div className="flex min-h-screen bg-[#433D3D]">
      {session ? <Sidebar /> : <Navbar />}

      {/* Main Content */}
      <main className="flex-1 h-screen overflow-y-auto mt-[60px] md:mt-0">
        {session ? (
          <>
            <div>
              <GreetingCard username={session?.user?.username} />
              {data.length === 0 ? (
                <p className="text-[#E2D8CC] px-4 py-2">
                  Belum ada data budaya.
                </p>
              ) : (
                <>
                  <CategoryFilter onChange={handleCategorySelect} />
                  <div className="flex justify-center">
                    <div className="w-full max-w-xl space-y-6 md:mb-0 mb-24">
                      {filteredData.length > 0 ? (
                        filteredData.map((item) => (
                          <CultureCard key={item.id} {...item} />
                        ))
                      ) : (
                        <div className="text-center text-white py-12">
                          Tidak ada hasil pencarian
                        </div>
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>
          </>
        ) : (
          <>
            <section className="min-h-screen flex flex-col md:flex-row items-center justify-between gap-6 w-full px-4">
              {/* KIRI: Text dan button Eksplor */}
              <div className="w-full md:w-1/2 md:justify-start">
                <h1 className="text-2xl md:text-3xl font-bold text-[#246f9e] leading-tight">
                  Lorem Ipsum Dolor <br />
                  <span className="text-[#2780ad]">
                    Lorem ipsum dolor sit amet
                  </span>
                </h1>
                <p className="text-sm text-gray-600 mt-2 max-w-lg">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna
                  aliqua...
                </p>
                <button className="mt-4 bg-[#246f9e] text-white px-6 py-2 rounded-full text-sm">
                  Eksplor Sekarang
                </button>
              </div>

              {/* KANAN: 4 Kotak */}
              <div className="w-full md:w-1/2 grid grid-cols-2 gap-4 mt-4">
                {" "}
                <div className="bg-white rounded-xl shadow p-6 text-center">
                  <p>Kotak 1</p>
                </div>
                <div className="bg-white rounded-xl shadow p-6 text-center">
                  <p>Kotak 2</p>
                </div>
                <div className="bg-white rounded-xl shadow p-6 text-center">
                  <p>Kotak 3</p>
                </div>
                <div className="bg-white rounded-xl shadow p-6 text-center">
                  <p>Kotak 4</p>
                </div>
              </div>
            </section>

            {/* Grid Cards */}
            <section className="px-6 py-4 grid grid-cols-2 md:grid-cols-3 gap-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-gray-800 h-20 rounded" />
              ))}
            </section>

            {/* Full Width Image with Overlay Text */}
            <section className="px-6 py-8">
              <div className="relative w-full h-64 md:h-96 rounded overflow-hidden">
                <Image
                  src="/images/children.jpg"
                  alt="Anak-anak bermain"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center text-white text-center">
                  <h2 className="text-lg md:text-xl font-semibold">
                    "Lorem Ipsum Dolor Sit Amet!"
                  </h2>
                  <button className="mt-4 px-4 py-1 bg-white text-black rounded-full text-sm">
                    Lorem ipsum
                  </button>
                </div>
              </div>
            </section>

            {/* Section Card Budaya */}
            <section className="px-6 py-8">
              <h3 className="text-lg font-semibold text-[#2780ad]">
                Lorem ipsum dolor sit amet
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                {[
                  "Warisan Kebudayaan",
                  "Suku Bangsa",
                  "Bahasa Daerah",
                  "Makanan Khas",
                ].map((label, i) => (
                  <div
                    key={i}
                    className="bg-white shadow-md rounded-lg p-4 flex items-center justify-center text-sm font-medium text-[#2780ad] border border-[#2780ad]"
                  >
                    {label}
                  </div>
                ))}
              </div>
            </section>

            {/* Feature Card & Swiper */}
            <section className="px-6 py-8 grid md:grid-cols-2 gap-6">
              {/* Left Card */}
              <div className="bg-white rounded-lg shadow-md p-4">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-gray-200 rounded-full" />
                  <div>
                    <p className="text-sm font-semibold">Lorem ipsum</p>
                    <p className="text-xs text-gray-500">Lorem Ipsum</p>
                  </div>
                </div>
                <div className="mt-4 w-full h-32 bg-gray-300 rounded" />
              </div>

              {/* Swiper */}
              <div>
                <Swiper
                  modules={[Pagination]}
                  pagination={{ clickable: true }}
                  spaceBetween={20}
                  slidesPerView={1}
                >
                  {[1, 2].map((i) => (
                    <SwiperSlide key={i}>
                      <div className="bg-white rounded-lg shadow-md p-4">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-[#2780ad] rounded-full" />
                          <div>
                            <p className="text-sm font-medium">Lorem ipsum</p>
                          </div>
                        </div>
                        <div className="mt-4 w-full h-32 relative rounded overflow-hidden">
                          <Image
                            src="/images/festival.jpg"
                            alt="Festival Budaya"
                            fill
                            className="object-cover"
                          />
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </section>

            {/* Footer Card */}
            <section className="px-6 py-8">
              <h3 className="text-lg font-semibold text-[#2780ad] mb-4">
                Lorem ipsum dolor sit amet
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="bg-gray-700 h-40 rounded text-white text-xs p-2 flex flex-col justify-end"
                  >
                    <span>Nama Budaya</span>
                    <span>Nama Daerah</span>
                    <span className="text-gray-300">Kategori Kebudayaan</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Footer */}
            <footer className="text-center text-xs text-gray-500 py-6">
              © 2025 Tech Titans GarudaHacks 6.0
            </footer>
          </>
        )}
      </main>

      {/* Modal */}
      {showModal && <InterestModal onClose={() => setShowModal(false)} />}
    </div>
  );
}
