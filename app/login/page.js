"use client";

import { useState, useEffect } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";

const slides = [
  {
    image:
      "https://res.cloudinary.com/dw8akacak/image/upload/v1753370460/Sumut_Tor-Tor_Pose_svw5x3.jpg",
    title: "Tari Tor Tor",
    description:
      "The Tor Tor dance of the Batak people blends tradition, spirituality, and communication during weddings, funerals, and sacred North Sumatran ceremonies.",
  },
  {
    image:
      "https://res.cloudinary.com/dr1afmnil/image/upload/v1751728452/culture_swap/emyghki5yfxskrisqq5l.jpg",
    title: "Rumah Gadang",
    description:
      "Rumah Gadang is the traditional house of the Minangkabau people, known for its curved roof resembling buffalo horns and rich cultural symbolism.",
  },
  {
    image:
      "https://res.cloudinary.com/dw8akacak/image/upload/v1753370428/Papua_Pegunungan_-_Sajojo_o5fji9.jpg",
    title: "Tarian Sajojo",
    description:
      "The Sajojo dance from Papua’s Sorong region is a lively social dance for all ages, often performed at cultural and festive gatherings.",
  },
];

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (result?.ok) {
      toast.success("Login successful. Welcome back!");
      setTimeout(() => {
        router.push("/");
      }, 1500);
    } else {
      toast.error("Login gagal. Periksa email atau password.");
    }
    setLoading(false);
  };

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Fullscreen Background Slider */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-1000 ease-in-out"
        style={{ backgroundImage: `url(${slides[currentSlide].image})` }}
      ></div>

      <div className="absolute inset-0 bg-black/40 z-0" />

      {/* Content Layer */}
      <div className="relative z-10 flex flex-col md:flex-row h-full w-full">
        {/* LEFT */}
        {/* LEFT: Deskripsi Slider (ditampilkan di semua ukuran) */}
        <div className="flex w-full md:w-1/2 items-end p-6 md:p-10 text-white">
          <div className="bg-black/30 p-4 md:p-6 rounded-lg max-w-xl">
            <h2 className="text-2xl md:text-4xl font-bold">
              {slides[currentSlide].title}
            </h2>
            <p className="mt-2 md:mt-4 text-sm md:text-base">
              {slides[currentSlide].description}
            </p>
          </div>
        </div>

        {/* RIGHT: Login Form */}
        <div className="flex w-full md:w-1/2 items-center justify-center bg-white/90 backdrop-blur-sm relative z-30 px-4 sm:px-6 md:px-12 py-10 md:py-16 pb-10 md:pb-16 rounded-none md:rounded-3xl md:m-12 m-0">
          <div className="w-full max-w-md">
            <h1 className="text-4xl font-bold text-center text-[#433D3D] mb-2">
              Welcome Back
            </h1>
            <p className="text-center text-sm text-[#433D3D] mb-6">
              Sign in to continue your journey. Access exclusive features and
              personalized experiences.
            </p>
            <form onSubmit={handleLogin} className="space-y-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full p-3 border border-[#433D3D] text-black rounded-md focus:outline-none focus:ring-2 focus:ring-[#433D3D]"
                required
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full p-3 border border-[#433D3D] text-black rounded-md focus:outline-none focus:ring-2 focus:ring-[#433D3D]"
                required
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#433D3D] hover:bg-[#E2D8CC] hover:text-[#433D3D] text-white py-2 rounded-md flex justify-center items-center gap-2 disabled:opacity-70"
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin w-5 h-5" />
                    waiting...
                  </>
                ) : (
                  "Log in"
                )}
              </button>
            </form>

            <div className="text-center mt-4 text-sm text-gray-600">
              Don’t have an account?{" "}
              <a href="/register" className="text-[#433D3D] underline">
                Create Account
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
