"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import Navbar from "./components/Navbar";

export default function HomePage() {
  return (
    <div className="flex min-h-screen bg-[#FFFBDE]">
      <Navbar />

      <main className="flex-1 h-screen overflow-y-auto mt-[60px] md:mt-0">
          <>
            <section className="min-h-screen flex flex-col md:flex-row items-center justify-between gap-6 w-full px-4">
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

            <section className="px-6 py-4 grid grid-cols-2 md:grid-cols-3 gap-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-gray-800 h-20 rounded" />
              ))}
            </section>

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

            <section className="px-6 py-8 grid md:grid-cols-2 gap-6">
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
      </main>
    </div>
  );
}
