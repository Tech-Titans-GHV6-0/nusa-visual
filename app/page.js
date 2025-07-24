import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <div className="flex min-h-screen bg-[#FFFBDE]">
        <Navbar />
        <main className="flex-1 h-screen overflow-y-auto mt-[60px] md:mt-0">
          <h2 className="text-black">WELCOME NUSA VISUAL</h2>
        </main>
      </div>
      <footer className="text-center text-xs text-gray-500 py-6">
        © 2025 Tech Titans GarudaHacks 6.0
      </footer>
    </>
  );
}
