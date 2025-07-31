// app/api/pasiens/search/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const q = searchParams.get('q') || ''

    const pasien = await prisma.pasien.findMany({
    where: {
        name: {
        contains: q,
        mode: 'insensitive',
        },
    },
    select: {
        id: true,
        name: true,
        address: true,
        phone: true,
        gender: true,
        nik: true,
    },
    take: 10,
    });

  return NextResponse.json(pasien)
}
