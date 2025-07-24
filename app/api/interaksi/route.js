import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req) {
  const { budayaId, userId } = await req.json();

  if (!budayaId || !userId) {
    return new Response("Missing data", { status: 400 });
  }

  const existingLike = await prisma.like.findFirst({
    where: { budayaId, userId },
  });

  let liked;
  if (existingLike) {
    await prisma.like.delete({
      where: { id: existingLike.id },
    });
    liked = false;
  } else {
    await prisma.like.create({
      data: { budayaId, userId },
    });
    liked = true;
  }

  const likeCount = await prisma.like.count({
    where: { budayaId },
  });

  return Response.json({ liked, likeCount });
}

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const budayaId = Number(searchParams.get("budayaId"));
  const userId = searchParams.get("userId");

  const likeCount = await prisma.like.count({
    where: { budayaId },
  });

  const liked = userId
    ? !!(await prisma.like.findFirst({ where: { budayaId, userId } }))
    : false;

  return Response.json({ likeCount, liked });
}
