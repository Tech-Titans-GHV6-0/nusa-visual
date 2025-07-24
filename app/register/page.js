"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";

const slides = [
  {
    image:
      "https://res.cloudinary.com/dr1afmnil/image/upload/v1752674187/culture_swap/cknl6nyxsnalpcmv3fv8.jpg",
    title: "Pacu Jalur",
    description:
      "Pacu Jalur is a traditional boat race from Riau, Indonesia, held on the Batang Kuantan River with long, vividly decorated boats and festive crowds.",
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
      "https://res.cloudinary.com/dr1afmnil/image/upload/v1739612051/m1qxwnsbavrwz0ah35pz.jpg",
    title: "IP Routing",
    description:
      "IP Routing is the process of directing data packets between networks through routers, forming the backbone of modern internet communication.",
  },
];

const countries = [
  "Afghanistan",
  "Albania",
  "Algeria",
  "Andorra",
  "Angola",
  "Antigua and Barbuda",
  "Argentina",
  "Armenia",
  "Australia",
  "Austria",
  "Azerbaijan",
  "Bahamas",
  "Bahrain",
  "Bangladesh",
  "Barbados",
  "Belarus",
  "Belgium",
  "Belize",
  "Benin",
  "Bhutan",
  "Bolivia",
  "Bosnia and Herzegovina",
  "Botswana",
  "Brazil",
  "Brunei",
  "Bulgaria",
  "Burkina Faso",
  "Burundi",
  "Cabo Verde",
  "Cambodia",
  "Cameroon",
  "Canada",
  "Central African Republic",
  "Chad",
  "Chile",
  "China",
  "Colombia",
  "Comoros",
  "Congo (Congo-Brazzaville)",
  "Costa Rica",
  "Croatia",
  "Cuba",
  "Cyprus",
  "Czech Republic",
  "Denmark",
  "Djibouti",
  "Dominica",
  "Dominican Republic",
  "DR Congo",
  "Ecuador",
  "Egypt",
  "El Salvador",
  "Equatorial Guinea",
  "Eritrea",
  "Estonia",
  "Eswatini",
  "Ethiopia",
  "Fiji",
  "Finland",
  "France",
  "Gabon",
  "Gambia",
  "Georgia",
  "Germany",
  "Ghana",
  "Greece",
  "Grenada",
  "Guatemala",
  "Guinea",
  "Guinea-Bissau",
  "Guyana",
  "Haiti",
  "Honduras",
  "Hungary",
  "Iceland",
  "India",
  "Indonesia",
  "Iran",
  "Iraq",
  "Ireland",
  "Israel",
  "Italy",
  "Ivory Coast",
  "Jamaica",
  "Japan",
  "Jordan",
  "Kazakhstan",
  "Kenya",
  "Kiribati",
  "Kuwait",
  "Kyrgyzstan",
  "Laos",
  "Latvia",
  "Lebanon",
  "Lesotho",
  "Liberia",
  "Libya",
  "Liechtenstein",
  "Lithuania",
  "Luxembourg",
  "Madagascar",
  "Malawi",
  "Malaysia",
  "Maldives",
  "Mali",
  "Malta",
  "Marshall Islands",
  "Mauritania",
  "Mauritius",
  "Mexico",
  "Micronesia",
  "Moldova",
  "Monaco",
  "Mongolia",
  "Montenegro",
  "Morocco",
  "Mozambique",
  "Myanmar",
  "Namibia",
  "Nauru",
  "Nepal",
  "Netherlands",
  "New Zealand",
  "Nicaragua",
  "Niger",
  "Nigeria",
  "North Korea",
  "North Macedonia",
  "Norway",
  "Oman",
  "Pakistan",
  "Palau",
  "Palestine",
  "Panama",
  "Papua New Guinea",
  "Paraguay",
  "Peru",
  "Philippines",
  "Poland",
  "Portugal",
  "Qatar",
  "Romania",
  "Russia",
  "Rwanda",
  "Saint Kitts and Nevis",
  "Saint Lucia",
  "Saint Vincent and the Grenadines",
  "Samoa",
  "San Marino",
  "Sao Tome and Principe",
  "Saudi Arabia",
  "Senegal",
  "Serbia",
  "Seychelles",
  "Sierra Leone",
  "Singapore",
  "Slovakia",
  "Slovenia",
  "Solomon Islands",
  "Somalia",
  "South Africa",
  "South Korea",
  "South Sudan",
  "Spain",
  "Sri Lanka",
  "Sudan",
  "Suriname",
  "Sweden",
  "Switzerland",
  "Syria",
  "Taiwan",
  "Tajikistan",
  "Tanzania",
  "Thailand",
  "Timor-Leste",
  "Togo",
  "Tonga",
  "Trinidad and Tobago",
  "Tunisia",
  "Turkey",
  "Turkmenistan",
  "Tuvalu",
  "Uganda",
  "Ukraine",
  "United Arab Emirates",
  "United Kingdom",
  "United States",
  "Uruguay",
  "Uzbekistan",
  "Vanuatu",
  "Vatican City",
  "Venezuela",
  "Vietnam",
  "Yemen",
  "Zambia",
  "Zimbabwe",
];

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [konfirmasiPassword, setKonfirmasiPassword] = useState("");
  const [region, setRegion] = useState("");
  const [origin, setOrigin] = useState("");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loading, setLoading] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (password !== konfirmasiPassword) {
      toast.error("Password dan konfirmasi tidak cocok.");
      setLoading(false);
      return;
    }

    let avatarUrl = "";

    if (avatar) {
      const formData = new FormData();
      formData.append("image", avatar);

      const uploadRes = await fetch("/api/budaya/upload", {
        method: "POST",
        body: formData,
      });

      const uploadData = await uploadRes.json();

      if (uploadData?.url) {
        avatarUrl = uploadData.url;
      } else {
        toast.error("Upload avatar gagal");
        setLoading(false);
        return;
      }
    }

    const res = await fetch("/api/register", {
      method: "POST",
      body: JSON.stringify({
        name,
        username,
        email,
        password,
        region,
        origin,
        avatar: avatarUrl,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.ok) {
      toast.success("Registrasi berhasil!");
      setTimeout(() => router.push("/login"), 2000);
    } else {
      const data = await res.json();
      toast.error(data.error || "Registrasi gagal");
    }

    setLoading(false);
  };

  return (
    <div className="relative min-h-[100dvh] w-full overflow-y-auto scroll-pt-32">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-in-out"
        style={{
          backgroundImage: `url(${slides[currentSlide].image})`,
          imageRendering: "auto",
        }}
      />

      <div className="absolute inset-0 bg-black/50 z-0" />

      <div className="relative z-10 flex flex-col md:flex-row h-full w-full">
        {/* Left section (slider text) */}
        <div className="flex w-full md:w-1/2 items-end p-6 md:p-10 text-white">
          <div className="bg-black/30 p-6 rounded-lg max-w-xl">
            <h2 className="text-2xl md:text-4xl font-bold">
              {slides[currentSlide].title}
            </h2>
            <p className="mt-2 md:mt-4 text-sm md:text-base">
              {slides[currentSlide].description}
            </p>
          </div>
        </div>

        {/* Right section (form) */}
        <div className="flex w-full md:w-1/2 items-center justify-center bg-white/90 backdrop-blur-sm px-6 md:px-12 py-10 md:py-16">
          <div className="w-full max-w-md space-y-6">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-green-800">Register</h1>
              <p className="text-sm text-gray-600 mt-2">
                Sign up to access exclusive content and cultural journeys.
              </p>
            </div>

            <form onSubmit={handleRegister} className="space-y-4 pb-5 md:pb-0">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Full Name"
                className="w-full p-3 border border-green-800 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-green-700 transition"
                required
              />
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-3 border border-green-800 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-green-700 transition"
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="w-full p-3 border border-green-800 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-green-700 transition"
                required
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full p-3 border border-green-800 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-green-700 transition"
                required
              />
              <input
                type="password"
                value={konfirmasiPassword}
                onChange={(e) => setKonfirmasiPassword(e.target.value)}
                placeholder="Konfirmasi Password"
                className="w-full p-3 border border-green-800 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-green-700 transition"
                required
              />
              <select
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                className="w-full p-3 border border-green-800 text-black rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-700 transition"
                required
              >
                <option value="">Select Country</option>
                {countries.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setAvatar(e.target.files?.[0])}
                className="w-full p-3 border border-green-800 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-green-700 transition"
              />
              <input
                type="text"
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
                placeholder="Region of Origin (example: Minangkabau)"
                className="w-full p-3 border border-green-800 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-green-700 transition"
                required
              />

              <button
                type="submit"
                className="w-full bg-green-800 text-white py-3 rounded-md hover:bg-green-900 transition font-medium"
              >
                Register
              </button>
            </form>

            <div className="text-center text-sm text-gray-600">
              Already have an account?{" "}
              <a href="/login" className="text-green-800 underline">
                Login
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
