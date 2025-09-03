import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { title, isPublic, userId, steps } = await req.json();

    if (!title || !userId) {
      return NextResponse.json(
        { error: "Title and userId are required" },
        { status: 400 }
      );
    }

    const tour = await prisma.tour.create({
      data: {
        title,
        isPublic: isPublic ?? false,
        userId,
        steps: {
          create: steps?.map((step: any, index: number) => ({
            title: step.title,
            description: step.description,
            mediaUrl: step.mediaUrl,
            order: step.order ?? index + 1,
            tags: step.tags ?? [],
            duration: step.duration,
            interactive: step.interactive ?? {},
          })),
        },
      },
      include: { steps: true },
    });

    return NextResponse.json(tour, { status: 201 });
  } catch (err) {
    console.error("Tour creation error:", err);
    return NextResponse.json(
      { error: "Failed to create tour" },
      { status: 500 }
    );
  }
}
