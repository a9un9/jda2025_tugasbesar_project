-- CreateTable
CREATE TABLE "obats" (
    "id" TEXT NOT NULL,
    "kode" TEXT NOT NULL,
    "nama" TEXT NOT NULL,
    "satuan" TEXT,
    "harga" DECIMAL(65,30) NOT NULL DEFAULT 0.0,
    "keterangan" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT,
    "updatedBy" TEXT,
    "deletedAt" TIMESTAMP(3),
    "deletedBy" TEXT,
    "deletedIs" INTEGER NOT NULL DEFAULT 2,

    CONSTRAINT "obats_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "polikliniks" (
    "id" TEXT NOT NULL,
    "kode" TEXT NOT NULL,
    "nama" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT,
    "updatedBy" TEXT,
    "deletedAt" TIMESTAMP(3),
    "deletedBy" TEXT,
    "deletedIs" INTEGER NOT NULL DEFAULT 2,

    CONSTRAINT "polikliniks_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "obats_kode_key" ON "obats"("kode");

-- CreateIndex
CREATE UNIQUE INDEX "polikliniks_kode_key" ON "polikliniks"("kode");
