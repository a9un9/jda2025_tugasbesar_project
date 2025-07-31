/*
  Warnings:

  - The `gender` column on the `pasiens` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('L', 'P');

-- AlterTable
ALTER TABLE "pasiens" DROP COLUMN "gender",
ADD COLUMN     "gender" "Gender";
