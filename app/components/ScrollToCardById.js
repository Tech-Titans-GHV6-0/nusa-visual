"use client";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function ScrollToCardById() {
  const searchParams = useSearchParams();
  const targetId = searchParams.get("id");

  useEffect(() => {
    if (!targetId) return;

    const scrollToElement = () => {
      const el = document.getElementById(`culture-${targetId}`);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        return true;
      }
      return false;
    };

    // Lakukan scroll secara berkala agar menunggu elemen muncul
    let attempts = 0;
    const interval = setInterval(() => {
      const found = scrollToElement();
      attempts++;
      if (found || attempts > 30) clearInterval(interval); // maksimal 3 detik
    }, 100);

    return () => clearInterval(interval);
  }, [targetId]);

  return null; // tidak render apa-apa
}
