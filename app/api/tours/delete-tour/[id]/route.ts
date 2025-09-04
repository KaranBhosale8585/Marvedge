import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  try {
    await prisma.tourStep.deleteMany({
      where: { tourId: id },
    });

    const deletedTour = await prisma.tour.delete({
      where: { id },
    });

    return NextResponse.json(
      { message: "Tour deleted successfully", deletedTour },
      { status: 200 }
    );
  } catch (err) {
    console.error("Delete tour error:", err);
    return NextResponse.json(
      { error: (err instanceof Error ? err.message : "Failed to delete tour") },
      { status: 500 }
    );
  }
}
