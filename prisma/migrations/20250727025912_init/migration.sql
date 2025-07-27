-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'DOKTER', 'PERAWAT');

-- CreateEnum
CREATE TYPE "DoctorType" AS ENUM ('DOKTER', 'PERAWAT');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'ADMIN',
    "dokterKode" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT,
    "updatedBy" TEXT,
    "deletedAt" TIMESTAMP(3),
    "deletedBy" TEXT,
    "deletedIs" INTEGER NOT NULL DEFAULT 2,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "dokters" (
    "id" TEXT NOT NULL,
    "dokterKode" TEXT NOT NULL,
    "dokterTipe" "DoctorType" NOT NULL,
    "dokterName" TEXT NOT NULL,
    "email" TEXT,
    "phone" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT,
    "updatedBy" TEXT,
    "deletedAt" TIMESTAMP(3),
    "deletedBy" TEXT,
    "deletedIs" INTEGER NOT NULL DEFAULT 2,

    CONSTRAINT "dokters_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "patients" (
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

    CONSTRAINT "patients_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "dokters_dokterKode_key" ON "dokters"("dokterKode");

-- CreateIndex
CREATE UNIQUE INDEX "dokters_email_key" ON "dokters"("email");

-- CreateIndex
CREATE UNIQUE INDEX "patients_email_key" ON "patients"("email");
