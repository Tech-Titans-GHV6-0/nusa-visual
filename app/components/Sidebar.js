"use client";

import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import {
  Home,
  LogOut,
  LogIn,
  PlusIcon,
  Search,
  MapPin,
  Bot,
  User,
  Ellipsis,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import toast from "react-hot-toast";

const menuItems = [
  { icon: <Home size={16} />, tooltip: "Home", href: "/" },
  {
    icon: <Search size={16} />,
    tooltip: "Search",
    href: "/dashboard/budaya/warisan",
  },
  { icon: <MapPin size={16} />, tooltip: "Map", href: "/map" },
  {
    icon: <Bot size={16} />,
    tooltip: "Chatbot AI",
    href: "/dashboard/budaya/bahasa",
  },
];

export default function Sidebar() {
  const { data: session, status } = useSession();
  const [hovered, setHovered] = useState(null);
  const router = useRouter();

  if (status === "loading") return null;

  {
    /* NAVBAR UNTUK MOBILE */
  }

  return (
    <>
      <div className="md:hidden fixed top-0 left-0 w-full h-[60px] bg-[#1E1E1E] bg-blur flex items-center justify-between px-4 z-50 shadow-md">
        <div className="flex items-center gap-2">
          {/* Logo Mobile */}
          <Image
            src="https://res.cloudinary.com/dw8akacak/image/upload/v1753359729/logo_nusa_visual_horizontal_veh1uf.png"
            alt="Logo Mobile"
            width={120}
            height={120}
            className="block md:hidden"
          />

          {/* Logo Desktop */}
          <Image
            src="https://res.cloudinary.com/dw8akacak/image/upload/v1753359729/logo_nusa_visual_gdbi9z.png"
            alt="Logo Nusa Visual"
            width={30}
            height={30}
            className="hidden md:block"
          />
        </div>

        <div className="flex items-center gap-4">
          <Link href="/search">
            <Search size={16} className="text-white" />
          </Link>
          <Link href="/dashboard/tambah">
            <PlusIcon size={16} className="text-white" />
          </Link>
        </div>
      </div>
      <div
        className={`
    bg-[#E2D8CC] text-white shadow-lg z-40
    fixed md:sticky
    bottom-0 md:top-0
    left-0
    w-full md:w-[80px]
    h-[70px] md:h-screen
    flex md:flex-col
    items-center justify-around md:justify-start
    py-2 md:py-6 gap-0 md:gap-6
    md:rounded-r-2xl
    transition-all
  `}
      >
        <Link href="/profile">
          <div className="hidden md:block p-2 md:p-4 rounded-xl transition-colors cursor-pointer">
            <Image
              src="https://res.cloudinary.com/dw8akacak/image/upload/v1753359729/logo_nusa_visual_gdbi9z.png"
              width={100}
              height={100}
              alt="icon nusa visual"
            />
          </div>
        </Link>

        {/* Menu lain dengan tooltip */}
        {menuItems.map((item, index) => (
          <motion.div
            key={index}
            onMouseEnter={() => setHovered(index)}
            onMouseLeave={() => setHovered(null)}
            className="relative group"
          >
            <Link href={item.href}>
              <motion.div
                whileHover={{ scale: 1.2 }}
                className="text-[#433D3D] p-2 md:p-4 rounded-xl hover:bg-black/20 transition-colors cursor-pointer"
              >
                {item.icon}
              </motion.div>
            </Link>
            <AnimatePresence>
              {hovered === index && (
                <motion.div
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className="hidden md:block absolute left-[75px] top-1/2 -translate-y-1/2 bg-black text-white px-4 py-2 rounded-md z-50 shadow-md whitespace-nowrap"
                >
                  {item.tooltip}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
        {/* Avatar atau Ikon Profile */}
        <motion.div
          onMouseEnter={() => setHovered("profile")}
          onMouseLeave={() => setHovered(null)}
          className="relative group"
        >
          <Link href={session ? "/profile" : "/auth/login"}>
            <motion.div
              whileHover={{ scale: 1.2 }}
              className="p-2 md:p-4 rounded-xl hover:bg-black/20 transition-colors cursor-pointer"
            >
              {session?.user?.avatar ? (
                <Image
                  src={session.user.avatar}
                  alt="Avatar"
                  fill
                  className="rounded-full object-cover"
                />
              ) : (
                <User size={16} />
              )}
            </motion.div>
          </Link>
          <AnimatePresence>
            {hovered === "profile" && (
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="hidden md:block absolute left-[75px] top-1/2 -translate-y-1/2 bg-black text-white px-4 py-2 rounded-md text-base z-50 shadow-md whitespace-nowrap"
              >
                {session ? "Profil Saya" : "Masuk ke Profil"}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <Link href="/tambah">
          <div className="hidden md:block p-2 md:p-4 rounded-xl bg-[#433D3D] hover:bg-[#433D3D]/40 transition-colors cursor-pointer">
            <PlusIcon size={16} />
          </div>
        </Link>

        {/* Login / Logout */}
        <div className="hidden md:block mt-auto mb-4">
          {session ? (
            <motion.div
              whileHover={{ scale: 1.15 }}
              onClick={() => {
                signOut({ redirect: false }).then(() => {
                  toast.success("Logout successful!");
                  router.push("/auth/login");
                });
              }}
              onMouseEnter={() => setHovered("logout")}
              onMouseLeave={() => setHovered(null)}
              className="relative cursor-pointer group"
            >
              <div className="p-4 hover:bg-[#D33232]/80 bg-[#D33232] rounded-xl transition-colors">
                <LogOut size={16} />
              </div>
              {hovered === "logout" && (
                <motion.div
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className="absolute left-[75px] top-1/2 -translate-y-1/2 bg-black text-white px-4 py-2 rounded-md text-base z-50 shadow-md whitespace-nowrap"
                >
                  Keluar
                </motion.div>
              )}
            </motion.div>
          ) : (
            <motion.div
              whileHover={{ scale: 1.15 }}
              onClick={() => signIn()}
              onMouseEnter={() => setHovered("login")}
              onMouseLeave={() => setHovered(null)}
              className="relative cursor-pointer group"
            >
              <div className="p-4 hover:bg-green-500/80 bg-green-500 rounded-xl transition-colors">
                <LogIn size={16} />
              </div>
              {hovered === "login" && (
                <motion.div
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className="absolute left-[75px] top-1/2 -translate-y-1/2 bg-black text-white px-4 py-2 rounded-md text-base z-50 shadow-md whitespace-nowrap"
                >
                  Masuk
                </motion.div>
              )}
            </motion.div>
          )}
        </div>
      </div>
    </>
  );
}
