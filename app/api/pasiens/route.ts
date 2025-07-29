// app/api/pasiens/route.ts
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { nik, name, address, email, phone, updatedBy } = await req.json();

    if (!nik || !name || !email) {
      return NextResponse.json({ error: "Data tidak lengkap" }, { status: 400 });
    }

    const existingPasien = await prisma.pasien.findFirst({
      where: { email, deletedIs: 2 },
    });

    if (existingPasien) {
      return NextResponse.json({ error: "Email sudah digunakan" }, { status: 400 });
    }

    const now = new Date();
    const wibDate = new Date(now.getTime() + 7 * 60 * 60 * 1000);

    await prisma.pasien.create({
      data: {
        nik,
        name,
        email,
        address,
        phone,
        createdAt: wibDate,
        createdBy: updatedBy || "Anonymous",
      },
    });

    return NextResponse.json({ message: "Dokter created" });
  } catch (error) {
    console.error("API /api/pasiens error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function GET() {
  const pasiens = await prisma.pasien.findMany({
    where: { deletedIs: 2 }, // pastikan ini sesuai dengan model
    select: {
      id: true,
      nik: true,
      name: true,
      address: true,
      email: true,
      phone: true,
    },
  });

  return NextResponse.json(pasiens);
}

