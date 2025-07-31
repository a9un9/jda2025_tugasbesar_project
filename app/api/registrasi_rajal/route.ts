import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const data = await req.json()

  try {
    let pasienId = data.pasienId

    // Jika pasien baru
    if (!pasienId) {
      const newPasien = await prisma.pasien.create({
        data: {
          nik: data.nik,
          name: data.name,
          email: data.email,
          phone: data.phone,
          address: data.address,
          gender: data.gender,
        },
      })
      pasienId = newPasien.id
    }

    const existing = await prisma.registrasiRj.findFirst({
      where: { pasienId },
    })

    if (existing) {
      return NextResponse.json(
        { error: 'Pasien masih memiliki pemeriksaan yang belum selesai.' },
        { status: 400 }
      )
    }

    // Buat registrasi
    const registrasi = await prisma.registrasiRj.create({
      data: {
        pasienId,
        dokterKode: data.dokterKode,
        keluhan: data.keluhan,
        tanggal: new Date(data.tanggal),
        poliKode: data.poliKode,
      },
      include: {
        pasien: true,
        dokter: true,
        poliklinik: true,
      },
    })

    // Ambil data poli berdasarkan kode
    const poli = await prisma.poliklinik.findUnique({
      where: { kode: data.poliKode },
    })

    return NextResponse.json({
      success: true,
      pasien: registrasi.pasien,
      dokter: registrasi.dokter,
      poli,
    })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Gagal menyimpan' }, { status: 500 })
  }
}
