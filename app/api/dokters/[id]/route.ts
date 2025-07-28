
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

  const dokters = await prisma.dokter.findUnique({
    where: { id },
  });

  if (!dokters) {
    return NextResponse.json({ error: 'Dokter tidak ditemukan' }, { status: 404 });
  }

  return NextResponse.json(dokters);
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

  const updated = await prisma.dokter.update({
    where: { id },
    data: {
        dokterKode: body.dokterKode,
        dokterName: body.dokterName,
        dokterTipe: body.dokterTipe,
        email: body.email,
        phone: body.phone,
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
    await prisma.dokter.update({
      where: { id },
      data: { deletedIs: 1, deletedBy: token.name ?? "unknown" },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error during soft delete:', error);
    return NextResponse.json({ success: false, error: 'Delete failed' }, { status: 500 });
  }
}