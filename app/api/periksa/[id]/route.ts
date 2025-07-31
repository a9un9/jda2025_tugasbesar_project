// app/api/periksa/[id]/route.ts
import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server';
import { getToken } from "next-auth/jwt";

export async function GET(
  req: NextRequest,
  context: any
) {
  const { id } = await context.params;

  if (!id) {
    return NextResponse.json({ error: 'ID tidak ditemukan' }, { status: 400 });
  }

  const registrasiRjs = await prisma.registrasiRj.findUnique({
    where: { id },
    include: {
      pasien: true,
      dokter: true,
      poliklinik: true,
    },
  });

  if (!registrasiRjs) {
    return NextResponse.json({ error: 'Data tidak ditemukan' }, { status: 404 });
  }

  return NextResponse.json(registrasiRjs);
}

export async function PUT(
  req: NextRequest,
  context: any
) {
  const { id } = await context.params;

  // Ambil token sesi login
  const token = await getToken({ req });

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const updated = await prisma.registrasiRj.update({
    where: { id },
    data: {
        status_periksa: 2,
        updatedBy: token.name ?? "unknown",
    },
  });

  return NextResponse.json(updated);
}
