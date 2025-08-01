import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  const body = await req.json();
  const { nama, email, pesan } = body;

  if (!nama || !email || !pesan) {
    return NextResponse.json({ error: 'Semua field wajib diisi.' }, { status: 400 });
  }

  const saved = await prisma.kontak.create({
    data: { nama, email, pesan, createdBy: nama },
  });

  // === Kirim Email ke Admin ===
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER, // akun Gmail admin
      pass: process.env.EMAIL_PASS, // password aplikasi
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER, // Email admin
    subject: `Pesan Masuk dari ${nama}`,
    html: `
      <p><strong>Nama:</strong> ${nama}</p>
      <p><strong>Email Pengirim:</strong> ${email}</p>
      <p><strong>Pesan:</strong><br/>${pesan}</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Gagal kirim email:', error);
    return NextResponse.json({ error: 'Pesan tersimpan tapi gagal kirim email.' }, { status: 500 });
  }

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
      status_pesan: true,
    },
  });

  return NextResponse.json(kontaks);
}

