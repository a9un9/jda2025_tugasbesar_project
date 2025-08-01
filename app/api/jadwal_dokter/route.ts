// app/api/obats/route.ts
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { kode, nama, satuan, harga, keterangan, updatedBy } = await req.json();

    if (!kode || !nama) {
      return NextResponse.json({ error: "Data tidak lengkap" }, { status: 400 });
    }

    const existingObat = await prisma.obat.findFirst({
      where: { kode, deletedIs: 2 },
    });

    if (existingObat) {
      return NextResponse.json({ error: "Email sudah digunakan" }, { status: 400 });
    }

    const now = new Date();
    const wibDate = new Date(now.getTime() + 7 * 60 * 60 * 1000);

    await prisma.obat.create({
      data: {
        kode,
        nama,
        satuan,
        harga,
        keterangan,
        createdAt: wibDate,
        createdBy: updatedBy || "Anonymous",
      },
    });

    return NextResponse.json({ message: "Dokter created" });
  } catch (error) {
    console.error("API /api/obats error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function GET() {
  const obats = await prisma.obat.findMany({
    where: { deletedIs: 2 }, // pastikan ini sesuai dengan model
    select: {
      id: true,
      kode: true,
      nama: true,
      satuan: true,
      harga: true,
      keterangan: true,
    },
  });

  return NextResponse.json(obats);
}

