/*
  Warnings:

  - A unique constraint covering the columns `[nik]` on the table `pasiens` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `nik` to the `pasiens` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "pasiens" ADD COLUMN     "nik" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "pasiens_nik_key" ON "pasiens"("nik");
