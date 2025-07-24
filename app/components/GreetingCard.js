"use client";

import { useState, useEffect } from "react";
import { Sunrise, Sun, Moon } from "lucide-react";

export default function GreetingCard({ username }) {
  const [greeting, setGreeting] = useState("Welcome");
  const [motivation, setMotivation] = useState("");
  const [icon, setIcon] = useState(<Sun />); 

  useEffect(() => {
    const now = new Date();
    const hourWIB = (now.getUTCHours() + 7) % 24;

    if (hourWIB >= 5 && hourWIB < 12) {
      setGreeting("Good Morning");
      setMotivation("Start your day by embracing new cultures 🌏");
      setIcon(<Sunrise className="w-10 h-10 text-[#E2D8CC]" />);
    } else if (hourWIB >= 12 && hourWIB < 18) {
      setGreeting("Good Afternoon");
      setMotivation("Let’s learn something new from the world today 🌍");
      setIcon(<Sun className="w-10 h-10 text-[#E2D8CC]" />);
    } else {
      setGreeting("Good Evening");
      setMotivation("Reflect and relax with cultural insights from others ✨");
      setIcon(<Moon className="w-10 h-10 text-[#E2D8CC]" />);
    }
  }, []);

  return (
    <div className="px-4 py-4 bg-[#433D3D] flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
      <div>
        <h2 className="text-3xl font-bold text-[#E2D8CC]">
          {greeting}, {username}
        </h2>
        <p className="text-sm text-[#E2D8CC] pt-2">{motivation}</p>
      </div>
      <div className="hidden md:block">{icon}</div>
    </div>
  );
}
