import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

export async function POST(req) {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;

  if (!userId) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
  }

  const body = await req.json();
  const { name, email, avatar, region, origin, interests } = body;

  try {
    const updated = await prisma.user.update({
      where: { id: userId },
      data: {
        name,
        email,
        avatar,
        region,
        origin,
        interests
      },
    });

    return new Response(JSON.stringify({ success: true, user: updated }));
  } catch (error) {
    return new Response(JSON.stringify({ error: "Gagal update user" }), { status: 500 });
  }
}
