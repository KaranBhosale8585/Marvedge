import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string; tourId: string }> }
) {
  try {
    const { id: userId, tourId } = context.params;

    const tour = await prisma.tour.findUnique({
      where: { id: tourId, userId },
      include: {
        steps: true,
        user: { select: { id: true, email: true } },
      },
    });

    if (!tour) {
      return NextResponse.json({ error: "Tour not found" }, { status: 404 });
    }

    return NextResponse.json(tour, { status: 200 });
  } catch (err) {
    console.error("Fetch single tour error:", err);
    return NextResponse.json(
      { error: "Failed to fetch tour" },
      { status: 500 }
    );
  }
}
