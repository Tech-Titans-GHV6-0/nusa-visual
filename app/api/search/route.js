// app/api/search/route.js
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q");

  if (!q || q.trim() === "") {
    return NextResponse.json([], { status: 200 });
  }

  const results = await prisma.budaya.findMany({
    where: {
      OR: [
        { title: { contains: q, mode: "insensitive" } },
        { origin: { contains: q, mode: "insensitive" } },
        { category: { contains: q, mode: "insensitive" } },
        { description: { contains: q, mode: "insensitive" } },
      ],
    },
    orderBy: { createdAt: "desc" },
    take: 20,
  });

  return NextResponse.json(results, { status: 200 });
}
