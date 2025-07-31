// app/api/dokters/route.ts
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { dokterKode, dokterName, dokterTipe, email, phone, updatedBy } = await req.json();

    if (!dokterKode || !dokterName || !email) {
      return NextResponse.json({ error: "Data tidak lengkap" }, { status: 400 });
    }

    const existingDoktor = await prisma.dokter.findFirst({
      where: { email, deletedIs: 2 },
    });

    if (existingDoktor) {
      return NextResponse.json({ error: "Email sudah digunakan" }, { status: 400 });
    }

    const now = new Date();
    const wibDate = new Date(now.getTime() + 7 * 60 * 60 * 1000);

    const mapToEnum = (input: string) => {
      if (input.toLowerCase() === "dokter") return "DOKTER";
      if (input.toLowerCase() === "perawat") return "PERAWAT";
      throw new Error("Invalid dokterTipe");
    };

    const dokterTipeEnum = mapToEnum(dokterTipe); // dari body request

    await prisma.dokter.create({
      data: {
        dokterKode,
        dokterName,
        dokterTipe: dokterTipeEnum,
        email,
        phone,
        createdAt: wibDate,
        createdBy: updatedBy || "Anonymous",
      },
    });

    return NextResponse.json({ message: "Dokter created" });
  } catch (error) {
    console.error("API /api/dokters error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function GET() {
  const dokters = await prisma.dokter.findMany({
    where: { deletedIs: 2, dokterTipe:'DOKTER' },
    select: {
      id: true,
      dokterKode: true,
      dokterName: true,
      dokterTipe: true,
      email: true,
      phone: true,
    },
  });

  return NextResponse.json(dokters);
}

