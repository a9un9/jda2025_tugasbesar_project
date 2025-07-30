
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getToken } from "next-auth/jwt";

export async function GET(
  req: NextRequest,
  context: any
) {
  const { id } = await context.params;

  if (!id) {
    return NextResponse.json({ error: 'ID tidak ditemukan' }, { status: 400 });
  }

  const obats = await prisma.obat.findUnique({
    where: { id },
  });

  if (!obats) {
    return NextResponse.json({ error: 'Poliklinik tidak ditemukan' }, { status: 404 });
  }

  return NextResponse.json(obats);
}

export async function PUT(
  req: NextRequest,
  context: any
) {
  const { id } = await context.params;
  const body = await req.json();

  // Ambil token sesi login
  const token = await getToken({ req });

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const updated = await prisma.obat.update({
    where: { id },
    data: {
        kode: body.kode,
        nama: body.nama,
        satuan: body.satuan,
        harga: body.harga,
        keterangan: body.keterangan,
        updatedBy: token.name ?? "unknown",
    },
  });

  return NextResponse.json(updated);
}

export async function DELETE(req: NextRequest, context: any) {
  const { id } = context.params;

  // Ambil token sesi login
  const token = await getToken({ req });

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await prisma.obat.update({
      where: { id },
      data: { deletedIs: 1, deletedBy: token.name ?? "unknown" },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error during soft delete:', error);
    return NextResponse.json({ success: false, error: 'Delete failed' }, { status: 500 });
  }
}