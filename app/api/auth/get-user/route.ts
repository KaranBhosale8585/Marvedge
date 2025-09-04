import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/utils/getCurrentUser";
import { NextResponse } from "next/server";


export const runtime = "nodejs";

export async function GET() {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const tours = await prisma.tour.findMany({
      where: { userId: user.id },
      include: {
        steps: true, // Include tour steps if needed
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ user, tours }, { status: 200 });
  } catch (error) {
    console.error("Error fetching tours:", error);
    return NextResponse.json(
      { error: "Failed to fetch tours" },
      { status: 500 }
    );
  }
}
