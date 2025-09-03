import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const tours = await prisma.tour.findMany({
      include: { steps: true, user: { select: { email: true, id: true } } },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(tours, { status: 200 });
  } catch (err) {
    console.error("Fetch tours error:", err);
    return NextResponse.json(
      { error: "Failed to fetch tours" },
      { status: 500 }
    );
  }
}