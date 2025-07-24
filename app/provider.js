"use client";

import { SessionProvider } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Loader from "./components/Loader";

export function Providers({ children }) {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [pathname]);
  return (
    <div>
      {loading ? <Loader /> : <SessionProvider>{children}</SessionProvider>}
    </div>
  );
}
