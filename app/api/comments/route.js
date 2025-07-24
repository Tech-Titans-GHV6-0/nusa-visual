// app/api/comments/route.js
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const budayaId = searchParams.get("budayaId");
  const countOnly = searchParams.get("count");

  if (!budayaId) {
    return new Response(JSON.stringify({ error: "Missing budayaId" }), {
      status: 400,
    });
  }

  if (countOnly === "true") {
    const count = await prisma.comment.count({
      where: { budayaId: parseInt(budayaId) },
    });
    return new Response(JSON.stringify({ count }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }

  const comments = await prisma.comment.findMany({
    where: { budayaId: parseInt(budayaId) },
    include: { user: true },
    orderBy: { createdAt: "desc" },
  });

  return new Response(JSON.stringify(comments), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

export async function POST(req) {
  const body = await req.json();
  const { content, userId, budayaId } = body;

  if (!content || !userId || !budayaId) {
    return new Response(JSON.stringify({ error: "Missing fields" }), {
      status: 400,
    });
  }

  const comment = await prisma.comment.create({
    data: {
      content,
      userId,
      budayaId: parseInt(budayaId),
    },
    include: {
      user: true,
    },
  });

  return new Response(JSON.stringify(comment), {
    status: 201,
    headers: { "Content-Type": "application/json" },
  });
}
