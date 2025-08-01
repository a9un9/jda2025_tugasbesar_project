// app/api/dashboard/summary/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { startOfDay, endOfDay } from 'date-fns'
import { DokterType } from '@prisma/client';

export async function GET() {
  try {

    const now = new Date()
    const todayStart = startOfDay(now)
    const todayEnd = endOfDay(now)

    const jumlahPasien = await prisma.pasien.count();
    // const jumlahPasien = await prisma.registrasiRj.count({
    //   where: {
    //     tanggal: {
    //       gte: todayStart,
    //       lte: todayEnd,
    //     },
    //   },
    // })
    const jumlahDokter = await prisma.dokter.count({where: { dokterTipe:'DOKTER'}});
    const jumlahPerawat = await prisma.dokter.count({where: { dokterTipe:'PERAWAT'}});
    const jumlahKonsultasiHariIni = await prisma.registrasiRj.count({
      where: {
        tanggal: {
          gte: new Date(new Date().setHours(0, 0, 0, 0)), // mulai hari ini
          lt: new Date(new Date().setHours(23, 59, 59, 999)), // sampai akhir hari ini
        },
      },
    });
    // const akunTerverifikasi = await prisma.user.count({
    //   where: { verified: true },
    // });

    return NextResponse.json({
      pasien: jumlahPasien,
      dokter: jumlahDokter,
      konsultasi: jumlahKonsultasiHariIni,
      perawat: jumlahPerawat,
    });
  } catch (error) {
    return NextResponse.json({ error: 'Gagal mengambil data' }, { status: 500 });
  }
}
