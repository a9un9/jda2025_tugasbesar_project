/*
  Warnings:

  - You are about to drop the `registrasi_rj` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "registrasi_rj" DROP CONSTRAINT "registrasi_rj_dokterKode_fkey";

-- DropForeignKey
ALTER TABLE "registrasi_rj" DROP CONSTRAINT "registrasi_rj_pasienId_fkey";

-- DropTable
DROP TABLE "registrasi_rj";

-- CreateTable
CREATE TABLE "registrasi_rjs" (
    "id" TEXT NOT NULL,
    "pasienId" TEXT NOT NULL,
    "dokterKode" TEXT NOT NULL,
    "tanggal" TIMESTAMP(3) NOT NULL,
    "keluhan" TEXT NOT NULL,

    CONSTRAINT "registrasi_rjs_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "registrasi_rjs" ADD CONSTRAINT "registrasi_rjs_pasienId_fkey" FOREIGN KEY ("pasienId") REFERENCES "pasiens"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "registrasi_rjs" ADD CONSTRAINT "registrasi_rjs_dokterKode_fkey" FOREIGN KEY ("dokterKode") REFERENCES "dokters"("dokterKode") ON DELETE RESTRICT ON UPDATE CASCADE;
