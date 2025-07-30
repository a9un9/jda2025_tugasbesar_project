// app/api/polikliniks/route.ts
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { kode, nama, updatedBy } = await req.json();

    if (!kode || !nama) {
      return NextResponse.json({ error: "Data tidak lengkap" }, { status: 400 });
    }

    const existingPoliklinik = await prisma.poliklinik.findFirst({
      where: { kode, deletedIs: 2 },
    });

    if (existingPoliklinik) {
      return NextResponse.json({ error: "Email sudah digunakan" }, { status: 400 });
    }

    const now = new Date();
    const wibDate = new Date(now.getTime() + 7 * 60 * 60 * 1000);

    await prisma.poliklinik.create({
      data: {
        kode,
        nama,
        createdAt: wibDate,
        createdBy: updatedBy || "Anonymous",
      },
    });

    return NextResponse.json({ message: "Dokter created" });
  } catch (error) {
    console.error("API /api/polikliniks error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function GET() {
  const polikliniks = await prisma.poliklinik.findMany({
    where: { deletedIs: 2 }, // pastikan ini sesuai dengan model
    select: {
      id: true,
      kode: true,
      nama: true,
    },
  });

  return NextResponse.json(polikliniks);
}

