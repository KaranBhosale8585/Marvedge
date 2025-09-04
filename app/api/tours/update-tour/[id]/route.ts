import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params;
    const { title, isPublic, steps } = await req.json();

    const updatedTour = await prisma.tour.update({
      where: { id: params.id },
      data: {
        title,
        isPublic,
        steps: {
          deleteMany: {},
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

    return NextResponse.json(updatedTour, { status: 200 });
  } catch (err) {
    console.error("Update tour error:", err);
    return NextResponse.json(
      { error: "Failed to update tour" },
      { status: 500 }
    );
  }
}
