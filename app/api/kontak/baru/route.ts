// app/api/kontak/baru/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const jumlah = await prisma.kontak.count({
      where: {
        status_pesan: 1,
      },
    });
    return NextResponse.json({ jumlah });
  } catch (error) {
    return NextResponse.json({ error: 'Gagal ambil data' }, { status: 500 });
  }
}