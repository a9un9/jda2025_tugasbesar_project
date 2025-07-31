/*
  Warnings:

  - Added the required column `poliKode` to the `registrasi_rjs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "registrasi_rjs" ADD COLUMN     "poliKode" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "registrasi_rjs" ADD CONSTRAINT "registrasi_rjs_poliKode_fkey" FOREIGN KEY ("poliKode") REFERENCES "polikliniks"("kode") ON DELETE RESTRICT ON UPDATE CASCADE;
