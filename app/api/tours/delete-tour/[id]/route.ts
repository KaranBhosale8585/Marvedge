// import { prisma } from "@/lib/prisma";
// import { NextRequest, NextResponse } from "next/server";

// export async function DELETE(
//   req: NextRequest,
//   context: { params: Promise<{ id: string }> }
// ) {
//   const { id } = await context.params;
//   try {
//     const data = await prisma.tour.findUnique({
//       where: { id},
//     });

//     console.log(data);

//     return NextResponse.json({ message: "Tour deleted" }, { status: 200 });
//   } catch (err) {
//     console.error("Delete tour error:", err);
//     return NextResponse.json(
//       { error: "Failed to delete tour" },
//       { status: 500 }
//     );
//   }
// }


import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  try {
    // Delete steps first (to avoid foreign key constraint error)
    await prisma.tourStep.deleteMany({
      where: { tourId: id },
    });

    // Then delete the tour itself
    const deletedTour = await prisma.tour.delete({
      where: { id },
    });

    return NextResponse.json(
      { message: "Tour deleted successfully", deletedTour },
      { status: 200 }
    );
  } catch (err: any) {
    console.error("Delete tour error:", err);
    return NextResponse.json(
      { error: err.message || "Failed to delete tour" },
      { status: 500 }
    );
  }
}
