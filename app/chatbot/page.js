"use client";
import { useState, useEffect, useRef } from "react";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import Sidebar from "../components/Sidebar";

export default function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [language, setLanguage] = useState("");
  const chatEndRef = useRef(null);

  const languageOptions = [
    "Aceh",
    "Batak",
    "Minangkabau",
    "Melayu Riau",
    "Jambi",
    "Palembang",
    "Rejang",
    "Lampung",
    "Betawi",
    "Sunda",
    "Jawa",
    "Bali",
    "Sasak",
    "Bugis",
    "Tolaki",
    "Gorontalo",
    "Mandar",
    "Ambon",
    "Ternate",
    "Meyah",
    "Biak",
    "Dani",
    "Marind",
    "Meyah",
  ];

  useEffect(() => {
    Swal.fire({
      title: "Pilih Bahasa Daerah",
      input: "select",
      inputOptions: languageOptions.reduce((obj, lang) => {
        obj[lang] = lang;
        return obj;
      }, {}),
      inputPlaceholder: "Pilih bahasa",
      confirmButtonText: "Pilih",
      confirmButtonColor: "#433D3D",
      backdrop: true,
    }).then((res) => {
      if (res.isConfirmed) {
        setLanguage(res.value);
        Swal.fire({
          toast: true,
          position: "top-end",
          icon: "info",
          title: `Chat akan menggunakan bahasa ${res.value}`,
          showConfirmButton: false,
          timer: 2000,
        });
      }
    });
  }, []);

  const sendMessage = async () => {
    if (!input.trim()) return;

    setMessages((prev) => [...prev, { from: "user", text: input }]);

    const res = await fetch("/api/gemini", {
      method: "POST",
      body: JSON.stringify({
        message: `Jawab dalam bahasa ${language}: ${input}`,
      }),
    });
    const { reply } = await res.json();

    setMessages((prev) => [...prev, { from: "bot", text: reply }]);
    setInput("");
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex min-h-screen my-16 md:my-0">
      <Sidebar />
      {/* Lebar penuh */}
      <div className="flex-1 bg-gray-50 flex flex-col px-4 py-6">
        <div className="flex-1 w-full flex flex-col justify-between">
          {/* Chat Area */}
          <div className="flex-1 overflow-y-auto space-y-3 mb-4 px-2">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${
                  msg.from === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`px-4 py-2 rounded-lg max-w-[75%] break-words ${
                    msg.from === "user"
                      ? "bg-[#433D3D] text-white rounded-br-none"
                      : "bg-[#B49C78] text-white rounded-bl-none"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>

          <div className="flex gap-2 px-2">
            <input
              type="text"
              className="flex-1 p-3 rounded-full text-black border-none shadow inner-focus:outline-none"
              placeholder="Tulis pesan..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button
              onClick={sendMessage}
              className="bg-[#B49C78] hover:bg-[#433D3D] text-white px-5 rounded-full shadow-md transition"
            >
              Kirim
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
