-- CreateTable
CREATE TABLE "kontaks" (
    "id" TEXT NOT NULL,
    "nama" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "pesan" TEXT NOT NULL,
    "status_pesan" INTEGER NOT NULL DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT,
    "updatedBy" TEXT,
    "deletedAt" TIMESTAMP(3),
    "deletedBy" TEXT,
    "deletedIs" INTEGER NOT NULL DEFAULT 2,

    CONSTRAINT "kontaks_pkey" PRIMARY KEY ("id")
);
