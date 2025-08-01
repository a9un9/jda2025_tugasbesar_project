import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  const body = await req.json();
  const { nama, email, pesan } = body;

  if (!nama || !email || !pesan) {
    return NextResponse.json({ error: 'Semua field wajib diisi.' }, { status: 400 });
  }

  const saved = await prisma.kontak.create({
    data: { nama, email, pesan, createdBy: nama },
  });

  return NextResponse.json({ success: true, data: saved });
}

export async function GET() {
  const kontaks = await prisma.kontak.findMany({
    where: { deletedIs: 2 }, // pastikan ini sesuai dengan model
    select: {
      id: true,
      nama: true,
      email: true,
      pesan: true,
      createdAt: true,
    },
  });

  return NextResponse.json(kontaks);
}

