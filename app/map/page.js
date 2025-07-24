"use client";
import dynamic from "next/dynamic";

const CultureMap = dynamic(() => import("../components/CultureMaps"), {
  ssr: false,
});

export default function CultureMapPage() {
  return (
    <div className="flex flex-col h-screen w-full">
      <main className="flex-grow z-0">
        <CultureMap />
      </main>
    </div>
  );
}
