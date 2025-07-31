-- AlterTable
ALTER TABLE "pasiens" ADD COLUMN     "gender" TEXT;

-- CreateTable
CREATE TABLE "registrasi_rj" (
    "id" TEXT NOT NULL,
    "pasienId" TEXT NOT NULL,
    "dokterKode" TEXT NOT NULL,
    "tanggal" TIMESTAMP(3) NOT NULL,
    "keluhan" TEXT NOT NULL,

    CONSTRAINT "registrasi_rj_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "registrasi_rj" ADD CONSTRAINT "registrasi_rj_pasienId_fkey" FOREIGN KEY ("pasienId") REFERENCES "pasiens"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "registrasi_rj" ADD CONSTRAINT "registrasi_rj_dokterKode_fkey" FOREIGN KEY ("dokterKode") REFERENCES "dokters"("dokterKode") ON DELETE RESTRICT ON UPDATE CASCADE;
