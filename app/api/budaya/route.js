import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(req) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
    });
  }

  const data = await req.json();
  console.log("Data diterima API:", data);

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) {
    return new Response(JSON.stringify({ error: "User not found" }), {
      status: 404,
    });
  }

  const budaya = await prisma.budaya.create({
    data: {
      title: data.title,
      origin: data.origin,
      category: data.category,
      description: data.description,
      image: data.image || null,
      userId: user.id,
    },
  });

  return Response.json(budaya);
}

export async function GET() {
  const all = await prisma.budaya.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      user: {
        select: {
          name: true,
          username: true,
          avatar: true,
        },
      },
    },
  });

  return Response.json(all);
}
