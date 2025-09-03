import { cookies } from "next/headers";
import { verifyToken } from "@/utils/auth";
import { prisma } from "@/lib/prisma";

export async function getCurrentUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  if (!token) return null;

  try {
    const payload = (await verifyToken(token)) as { id?: string };
    if (!payload?.id) return null;

    const user = await prisma.user.findUnique({
      where: { id: payload.id },
      include: { tours: true }, // optional
    });
    return user || null;
  } catch (error) {
    console.error("Invalid token or DB error:", error);
    return null;
  }
}
