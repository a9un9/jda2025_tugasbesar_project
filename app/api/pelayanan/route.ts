// app/api/rawat-jalan/route.ts
import { prisma } from '@/lib/prisma'
import { startOfDay, endOfDay } from 'date-fns'
import { NextResponse } from 'next/server'

export async function GET() {
  const now = new Date()
  const start = startOfDay(now)
  const end = endOfDay(now)

  const daftar = await prisma.registrasiRj.findMany({
    where: {
      tanggal: {
        gte: start,
        lte: end,
      },
      status_periksa: 1,
      deletedIs: 2,
    },
    include: {
      pasien: true,
      dokter: true,
      poliklinik: true,
    },
  })

  return NextResponse.json(daftar)
}
