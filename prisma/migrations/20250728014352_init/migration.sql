/*
  Warnings:

  - You are about to drop the `patients` table. If the table is not empty, all the data it contains will be lost.
  - Changed the type of `dokterTipe` on the `dokters` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "DokterType" AS ENUM ('DOKTER', 'PERAWAT');

-- AlterTable
ALTER TABLE "dokters" DROP COLUMN "dokterTipe",
ADD COLUMN     "dokterTipe" "DokterType" NOT NULL;

-- DropTable
DROP TABLE "patients";

-- DropEnum
DROP TYPE "DoctorType";

-- CreateTable
CREATE TABLE "pasiens" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT,
    "phone" TEXT,
    "address" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT,
    "updatedBy" TEXT,
    "deletedAt" TIMESTAMP(3),
    "deletedBy" TEXT,
    "deletedIs" INTEGER NOT NULL DEFAULT 2,

    CONSTRAINT "pasiens_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "pasiens_email_key" ON "pasiens"("email");
