"use client";

import {
  MapContainer,
  TileLayer,
  Marker,
  GeoJSON,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Dice3, Info } from "lucide-react";
import budayaData from "@/data/budayaData";
import Image from "next/image";
import Sidebar from "./Sidebar";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

function FlyZoom({ position }) {
  const map = useMap();
  useEffect(() => {
    if (position) {
      map.flyTo(position, 8, { duration: 1.2 }); // zoom level 8
    }
  }, [position]);
  return null;
}

export default function CultureMapPage() {
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [geoJsonData, setGeoJsonData] = useState(null);
  const [highlightedFeature, setHighlightedFeature] = useState(null);

  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/ans-4175/peta-indonesia-geojson/master/indonesia-prov.geojson"
    )
      .then((r) => r.json())
      .then((data) => setGeoJsonData(data));
  }, []);

  const handleRegionClick = (feature) => {
    const nama = feature.properties.NAME_1;
    const match = budayaData.find((prov) => prov.nama === nama);
    if (match) {
      setSelectedProvince({ ...match, geo: feature });
      setHighlightedFeature(feature);
    }
  };

  const handleRandomExplore = () => {
    const randomIndex = Math.floor(Math.random() * budayaData.length);
    const prov = budayaData[randomIndex];
    setSelectedProvince(prov);
    mapRef.current?.flyTo(prov.posisi, 7, { duration: 1.5 });
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="relative h-[130vh] w-full">
        <div className="absolute bottom-6 right-6 md:top-5 md:right-5 z-[999]">
          <button
            onClick={handleRandomExplore}
            className="flex items-center gap-2 px-4 py-2 rounded-full shadow-lg bg-[#B49C78] hover:scale-105 hover:shadow-xl transition-all duration-200 text-white font-semibold"
          >
            <Dice3 size={18} />
            Jelajahi Acak
          </button>
        </div>

        <MapContainer
          center={[-2.5, 118]}
          zoom={5}
          scrollWheelZoom={true}
          className="h-full w-full"
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap contributors"
          />

          {budayaData.map((prov, i) => (
            <Marker
              key={i}
              position={prov.posisi}
              icon={L.icon({
                iconUrl: prov.iconUrl,
                iconSize: [50, 50],
                iconAnchor: [20, 40],
                popupAnchor: [0, -48],
              })}
              eventHandlers={{
                click: () => {
                  setSelectedProvince(prov);
                },
              }}
            />
          ))}

          {geoJsonData && (
            <GeoJSON
              data={geoJsonData}
              style={{
                color: "#666",
                weight: 0.8,
                fillOpacity: 0,
              }}
              onEachFeature={(feature, layer) => {
                layer.on({
                  click: () => handleRegionClick(feature),
                });
              }}
            />
          )}

          {highlightedFeature && (
            <GeoJSON
              data={highlightedFeature}
              style={{
                color: "#d44", // garis batas provinsi
                weight: 4, // tebal garis
                fillColor: "#f99", // isi shading transparan
                fillOpacity: 0.2,
              }}
            />
          )}

          {selectedProvince && <FlyZoom position={selectedProvince.posisi} />}
        </MapContainer>

        <AnimatePresence>
          {selectedProvince && (
            <motion.div
              key={selectedProvince.nama}
              initial={{ opacity: 0, x: 200 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 200 }}
              transition={{ duration: 0.4 }}
              className="absolute right-4 top-[110px] md:top-[100px] md:right-5 max-w-md w-[350px] bg-white rounded-2xl shadow-xl z-[1000] overflow-hidden border"
            >
              {/* Gambar header */}
              <div className="relative h-48 w-full">
                <Image
                  src={selectedProvince.image}
                  alt={selectedProvince.nama}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-t-2xl"
                />
                <div className="absolute bottom-3 left-4 text-white">
                  <div className="flex items-center gap-2">
                    <Image
                      src={selectedProvince.iconUrl}
                      alt="Logo"
                      width={60}
                      height={60}
                      className="rounded-full"
                    />
                    <h2 className="text-lg font-bold drop-shadow">
                      {selectedProvince.nama}
                    </h2>
                  </div>
                  <p className="text-sm drop-shadow bg-[#433D3D]/80 text-center rounded-full px-2 py-1">
                    {selectedProvince.julukan}
                  </p>
                </div>
              </div>

              {/* Isi detail */}
              <div className="p-5">
                <h3 className="text-lg font-semibold mb-1 text-black">
                  Deskripsi
                </h3>
                <p className="text-sm text-gray-700 mb-4 text-black">
                  {selectedProvince.deskripsi}
                </p>

                <div className="text-sm mb-2">
                  <span className="font-semibold text-black">Makanan</span>
                  <p className="text-black">
                    {selectedProvince.makanan || "-"}
                  </p>
                </div>

                <div className="text-sm mb-4">
                  <span className="font-semibold text-black">Lagu</span>
                  <p className="text-black">{selectedProvince.lagu || "-"}</p>
                </div>

                {/* Tag budaya */}
                <div className="flex flex-wrap gap-2">
                  {selectedProvince.suku?.map((budaya, index) => (
                    <span
                      key={index}
                      className="bg-[#E2D8CC] text-[#433D3D] text-xs font-semibold px-3 py-1 rounded-full"
                    >
                      {budaya}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
