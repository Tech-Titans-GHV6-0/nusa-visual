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
import DraggableCategory from "./components/DraggableCategory";
import { motion } from "framer-motion";
import Link from "next/link";

function BudayaCard({ namaBudaya, namaDaerah, kategori, imageUrl }) {
  return (
    <motion.div
      className="min-w-[260px] h-40 rounded-lg relative overflow-hidden text-white"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <Image
        src={imageUrl}
        alt={namaBudaya}
        fill
        className="object-cover object-center"
        priority={true} 
      />

      {/* Overlay gelap */}
      <div className="absolute inset-0 bg-black/50 z-10" />

      {/* Konten */}
      <div className="relative z-20 p-3 flex flex-col justify-end h-full">
        <span className="text-sm font-semibold">{namaBudaya}</span>
        <span className="text-xs">{namaDaerah}</span>
        <span className="text-[10px] text-gray-200 mt-1 border border-gray-300 rounded-full px-2 py-[2px] w-fit">
          {kategori}
        </span>
      </div>
    </motion.div>
  );
}

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
    "Permainan Tradisional",
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
    <div className="flex min-h-screen bg-[#433D3D] pt-12 md:pt-0">
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
                  <DraggableCategory
                    onChange={handleCategorySelect}
                    selected={selectedCategory}
                  />
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
            <motion.section
              initial="hidden"
              whileInView="visible"
              transition={{ staggerChildren: 0.1 }}
              viewport={{ once: true, amount: 0.2 }}
              className="min-h-screen flex flex-col md:flex-row items-center justify-between gap-6 w-full px-4"
            >
              {/* KIRI: Text dan button Eksplor */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 40 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.6 }}
                className="w-full md:w-1/2 md:justify-start"
              >
                <h1 className="text-2xl md:text-3xl font-bold text-[#B49C78] leading-tight">
                  Nusa Visual <br />
                  <span className="text-[#E2D8CC]">
                    A way to visualize Nusantara`s Heritage
                  </span>
                </h1>
                <p className="text-sm text-[#E2D8CC] mt-2 max-w-lg">
                  Menghadirkan cara baru merawat budaya melalui eksplorasi
                  digital, kolaborasi terbuka, dan ruang hidup yang menjadikan
                  warisan tak lagi sekadar arsip, tapi sesuatu yang terus
                  bernapas.
                </p>
                <Link href="/login">
                  <button className="mt-4 bg-[#B49C78] hover:bg-[#E2D8CC] hover:text-[#B49C78] text-white px-6 py-2 rounded-full text-sm">
                    Eksplor Sekarang
                  </button>
                </Link>
              </motion.div>

              {/* KANAN: 4 Kotak */}
              {/* KANAN: 4 Gambar Kotak */}
              <div className="w-full md:w-1/2 grid grid-cols-2 gap-4 mt-4">
                {[
                  "/v1753367908/Main-Image-Songket-Palembang-by-Digstraksi_abriqw.jpg",
                  "/v1753367914/Unesco_-_Hutan_Hujan_Tropis_-Taman_Nasional_Gunung_Leuser_natwem.jpg",
                  "/v1753367916/Raja_Ampat_Islands_-_journal.pbio.1001457.g001_cinblj.png",
                  "/v1753367918/Angklung__2315119130_btkv5l.jpg",
                ].map((img, i) => (
                  <div
                    key={i}
                    className="relative h-32 md:h-40 rounded-xl overflow-hidden shadow"
                  >
                    <Image
                      src={`https://res.cloudinary.com/dw8akacak/image/upload${img}`}
                      alt={`Kotak ${i + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </motion.section>
            <motion.section
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true, amount: 0.2 }}
              className="px-6 py-8"
            >
              <div className="relative w-full h-64 md:h-96 rounded rounded-4xl overflow-hidden">
                <Image
                  src="https://res.cloudinary.com/dw8akacak/image/upload/v1753389640/matheo-jbt-MYN9ybY3vVc-unsplash_ru3s8b.jpg"
                  alt="Pelestarian Kebudayaan"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center text-white text-center">
                  <h2 className="text-lg md:text-3xl font-medium">
                    “Pelestarian budaya bukan tugas segelintir orang, <br />{" "}
                    kolaborasi kamu bisa jadi alasan ia tetap hidup.”
                  </h2>
                  <Link href="/login">
                    <button className="mt-4 px-4 py-3 bg-white/40 backdrop-blur-md text-white hover:bg-[#433D3D] rounded-full text-sm">
                      Bergabung sekarang
                    </button>
                  </Link>
                </div>
              </div>
            </motion.section>

            <section className="px-6 py-8">
              <p className="text-[#B49C78]">
                Eksplorasi kekayaan warisan Nusantara
              </p>
              <h3 className="text-lg md:text-3xl font-semibold text-[#E2D8CC]">
                Jelajahi kearifan lokal
              </h3>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                {[
                  {
                    label: "Kerajinan Tangan",
                    image:
                      "https://res.cloudinary.com/dw8akacak/image/upload/v1753370898/Main-Image-Songket-Palembang-by-Digstraksi_rp6vpk.jpg",
                  },
                  {
                    label: "Rumah Adat",
                    image:
                      "https://res.cloudinary.com/dw8akacak/image/upload/v1753391019/eb7155ad2d8a5e1de228e78d26e655cf_iwvota.jpg",
                  },
                  {
                    label: "Tarian Daerah",
                    image:
                      "https://res.cloudinary.com/dw8akacak/image/upload/v1753370595/Sumsel_Tari_Kebagh__2017_1_alofqr.jpg",
                  },
                  {
                    label: "Festival Budaya",
                    image:
                      "https://res.cloudinary.com/dw8akacak/image/upload/v1753391161/Tarian_Anak_di_Atas_Perahu_Pacu_Jalur_Viral_dan_Mendunia_Begini_Sejarahnya_n4fae2.jpg",
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="relative h-40 md:h-56 rounded-2xl overflow-hidden shadow-md border border-[#B49C78] flex items-end justify-start bg-gray-200"
                  >
                    {/* Lazy load img for preloading background */}
                    <Image
                      src={item.image}
                      alt={item.label}
                      priority={true}
                      fill
                      className="absolute w-0 h-0 opacity-0"
                    />
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-all duration-500"
                      style={{ backgroundImage: `url(${item.image})` }}
                    />
                    <div className="bg-white/40 backdrop-blur-md text-white text-sm font-medium px-3 py-1 rounded-full m-4 z-10">
                      {item.label}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true, amount: 0.2 }}
              className="px-6 pt-12"
            >
              <h3 className="text-lg md:text-3xl font-semibold text-[#E2D8CC]">
                Ikut kolaborasi dalam pelestarian budaya
              </h3>
            </motion.div>
            <motion.section
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true, amount: 0.2 }}
              className="px-4 md:px-6 py-8 grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {/* Kartu Kiri */}
              <div className="bg-white rounded-lg shadow-md p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-200 rounded-full" />
                  <div>
                    <p className="text-sm font-bold text-[#B49C78]">Heiza</p>
                    <p className="text-xs text-[#E2D8CC]">Lorem Ipsum</p>
                  </div>
                </div>
                <div className="py-2">
                  <h1 className="text-[#B49C78] text-base md:text-lg">
                    Hello World
                  </h1>
                </div>
                <div className="mt-4 w-full h-48 md:h-64 relative rounded overflow-hidden">
                  <Image
                    src="https://res.cloudinary.com/dw8akacak/image/upload/v1753367917/Candi_Borobudur_fdscg1.jpg"
                    alt="Candi Borobudur"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Swiper */}
              <div className="w-full">
                <Swiper
                  modules={[Pagination]}
                  pagination={{ clickable: true }}
                  spaceBetween={16}
                  slidesPerView={1}
                >
                  {/* Slide 1 */}
                  <SwiperSlide>
                    <div className="bg-white rounded-lg shadow-md p-4">
                      <div className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-[#2780ad] rounded-full" />
                        <div>
                          <p className="text-sm font-bold text-[#B49C78]">
                            Ricos
                          </p>
                          <p className="text-xs text-[#E2D8CC]">
                            Pemerhati Budaya
                          </p>
                        </div>
                      </div>
                      <div className="py-2">
                        <h1 className="text-[#B49C78] text-base md:text-lg">
                          Hello World
                        </h1>
                      </div>
                      <div className="mt-4 w-full h-48 md:h-64 relative rounded overflow-hidden">
                        <Image
                          src="https://res.cloudinary.com/dw8akacak/image/upload/v1753367949/Prambanan_Temple_Yogyakarta_Indonesia_ybpphc.jpg"
                          alt="Candi Prambanan"
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                  </SwiperSlide>

                  {/* Slide 2 */}
                  <SwiperSlide>
                    <div className="relative w-full h-64 md:h-96 rounded rounded-4xl overflow-hidden">
                      <Image
                        src="https://res.cloudinary.com/dw8akacak/image/upload/v1753392823/bali_upacara_x3yimf.png"
                        alt="Pelestarian Kebudayaan"
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center text-white text-center">
                        <h2 className="text-lg md:text-2xl font-medium">
                          “Kebudayaan harus hidup dalam keseharian, <br />
                          bukan disimpan dalam museum saja.”
                        </h2>
                        <Link href="/register">
                          <button className="mt-4 px-6 py-3 bg-white/40 backdrop-blur-md text-white hover:bg-[#433D3D] rounded-full text-sm">
                            Daftar
                          </button>
                        </Link>
                      </div>
                    </div>
                  </SwiperSlide>
                </Swiper>
              </div>
            </motion.section>

            <div className="overflow-hidden group relative">
              <div className="flex w-[200%] animate-left-marquee group-hover:[animation-play-state:paused] gap-6 items-center">
                <div className="flex gap-6">
                  <BudayaCard
                    key="t1"
                    namaBudaya="Tari Piring"
                    namaDaerah="Sumatra Barat"
                    kategori="Tari Tradisional"
                    imageUrl="https://res.cloudinary.com/dw8akacak/image/upload/v1753367939/Tari_Piring_dan_Pecahan_Kaca_o1sld3.jpg "
                  />
                  <BudayaCard
                    key="t2"
                    namaBudaya="Tari Nguri"
                    namaDaerah="NTB"
                    kategori="Tari Tradisional"
                    imageUrl="https://res.cloudinary.com/dw8akacak/image/upload/v1753382781/NTB-tarian-nguri-417b1bc5116ee8c5d401b428355ab421_am4eoh_v6z8gc.png"
                  />
                  <BudayaCard
                    key="t3"
                    namaBudaya="Tari Kebagh"
                    namaDaerah="Sumatera Selatan"
                    kategori="Tari Tradisional"
                    imageUrl="https://res.cloudinary.com/dw8akacak/image/upload/v1753370595/Sumsel_Tari_Kebagh__2017_1_alofqr.jpg"
                  />
                  <BudayaCard
                    key="t4"
                    namaBudaya="Tari Jaipin Sigam"
                    namaDaerah="Kalimantan Selatan"
                    kategori="Tari Tradisional"
                    imageUrl="https://res.cloudinary.com/dw8akacak/image/upload/v1753370451/Kalsel_Tari_Japin_Sigam_nhmydj.jpg"
                  />
                  <BudayaCard
                    key="t5"
                    namaBudaya="Tari Giring Giring"
                    namaDaerah="Kalimantan Tengah"
                    kategori="Tari Tradisional"
                    imageUrl="https://res.cloudinary.com/dw8akacak/image/upload/v1753370448/Tari_Giring-Giring_Kalteng_ey1nmu.jpg"
                  />
                  <BudayaCard
                    key="t6"
                    namaBudaya="Tari Tor Tor"
                    namaDaerah="Sumatera Utara"
                    kategori="Tari Tradisional"
                    imageUrl="https://res.cloudinary.com/dw8akacak/image/upload/v1753370460/Sumut_Tor-Tor_Pose_svw5x3.jpg"
                  />
                  <BudayaCard
                    key="t7"
                    namaBudaya="Tari Melinting"
                    namaDaerah="Lampung"
                    kategori="Tari Tradisional"
                    imageUrl="https://res.cloudinary.com/dw8akacak/image/upload/v1753370750/Lampung_Tari_Melinting_tklync.jpg"
                  />
                  <BudayaCard
                    key="t8"
                    namaBudaya="Tari Rampang Beduk"
                    namaDaerah="Banten"
                    kategori="Tari Tradisional"
                    imageUrl="https://res.cloudinary.com/dw8akacak/image/upload/v1753382781/Banteng_tari-rampak-beduk-980e-dom_ibu2ra_ftynwk.png"
                  />
                  <BudayaCard
                    key="t9"
                    namaBudaya="Tari Soya Soya"
                    namaDaerah="Maluku Utara"
                    kategori="Tari Tradisional"
                    imageUrl="https://res.cloudinary.com/dw8akacak/image/upload/v1753370899/Tari-Soya-Soya-Maluku-Utara.-republika_uojaxj.jpg"
                  />
                  <BudayaCard
                    key="t10"
                    namaBudaya="Tari Dana Dana"
                    namaDaerah="Gorontalo"
                    kategori="Tari Tradisional"
                    imageUrl="https://res.cloudinary.com/dw8akacak/image/upload/v1753370430/Gorontalo_Tari_Dana-Dana_nxud0l.jpg"
                  />
                </div>
              </div>
            </div>
            <style jsx>{`
              @keyframes left-marquee {
                0% {
                  transform: translateX(0%);
                }
                100% {
                  transform: translateX(-50%);
                }
              }

              @keyframes right-marquee {
                0% {
                  transform: translateX(-50%);
                }
                100% {
                  transform: translateX(0%);
                }
              }

              .animate-left-marquee {
                animation: left-marquee 40s linear infinite;
              }

              .animate-right-marquee {
                animation: right-marquee 40s linear infinite;
              }
            `}</style>

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
