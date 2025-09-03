/*
  Warnings:

  - You are about to drop the column `steps` on the `Tour` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Tour" DROP COLUMN "steps";

-- CreateTable
CREATE TABLE "public"."TourStep" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "mediaUrl" TEXT,
    "order" INTEGER NOT NULL,
    "tags" TEXT[],
    "duration" INTEGER,
    "interactive" JSONB,
    "tourId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TourStep_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."TourStep" ADD CONSTRAINT "TourStep_tourId_fkey" FOREIGN KEY ("tourId") REFERENCES "public"."Tour"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
