// app/api/dashboard/summary/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const jumlahPasien = await prisma.pasien.count();
    const jumlahDokter = await prisma.dokter.count();
    // const jumlahKonsultasiHariIni = await prisma.konsultasi.count({
    //   where: {
    //     tanggal: {
    //       gte: new Date(new Date().setHours(0, 0, 0, 0)), // mulai hari ini
    //       lt: new Date(new Date().setHours(23, 59, 59, 999)), // sampai akhir hari ini
    //     },
    //   },
    // });
    const akunTerverifikasi = await prisma.user.count({
      where: { verified: true },
    });

    return NextResponse.json({
      pasien: jumlahPasien,
      dokter: jumlahDokter,
    //   konsultasi: jumlahKonsultasiHariIni,
      verifikasi: akunTerverifikasi,
    });
  } catch (error) {
    return NextResponse.json({ error: 'Gagal mengambil data' }, { status: 500 });
  }
}
