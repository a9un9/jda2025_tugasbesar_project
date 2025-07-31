/*
  Warnings:

  - Added the required column `updatedAt` to the `registrasi_rjs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "registrasi_rjs" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "createdBy" TEXT,
ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "deletedBy" TEXT,
ADD COLUMN     "deletedIs" INTEGER NOT NULL DEFAULT 2,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "updatedBy" TEXT;
