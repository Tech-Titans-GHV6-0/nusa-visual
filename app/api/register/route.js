import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    const { name, email, password, region, origin, avatar, username } = await req.json();

    // Validasi input
    if (!name || name.length < 2) {
      return Response.json(
        { error: "Nama harus diisi minimal 2 huruf" },
        { status: 400 }
      );
    }

    if (!email || !email.includes("@")) {
      return Response.json({ error: "Email tidak valid." }, { status: 400 });
    }

    if (!password || password.length < 6) {
      return Response.json(
        { error: "Password minimal 6 karakter." },
        { status: 400 }
      );
    }

    if (!region || !origin) {
      return Response.json(
        { error: "Region dan asal daerah wajib diisi." },
        { status: 400 }
      );
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return Response.json(
        { error: "Pendaftaran gagal. Email sudah digunakan." },
        { status: 409 } 
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: {
        name,
        username,
        email,
        password: hashedPassword,
        region,
        origin,
        avatar
      },
    });

    return Response.json({ success: true, message: "Pendaftaran berhasil." });
  } catch (err) {
    console.error("Terjadi kesalahan saat registrasi:", err);
    return Response.json(
      { error: "Terjadi kesalahan server. Coba lagi nanti." },
      { status: 500 }
    );
  }
}
