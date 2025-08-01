
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getToken } from "next-auth/jwt";
import nodemailer from "nodemailer";

export async function GET(
  req: NextRequest,
  context: any
) {
  const { id } = await context.params;

  if (!id) {
    return NextResponse.json({ error: 'ID tidak ditemukan' }, { status: 400 });
  }

  const kontaks = await prisma.kontak.findUnique({
    where: { id },
  });

  if (!kontaks) {
    return NextResponse.json({ error: 'Pesan tidak ditemukan' }, { status: 404 });
  }

  return NextResponse.json(kontaks);
}

export async function PUT(req: NextRequest, context: any) {
  const { id } = context.params;
  const body = await req.json();

  const token = await getToken({ req });
  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    
    const updated = await prisma.kontak.update({
      where: { id },
      data: {
        status_pesan: body.status_pesan ?? 2,
        updatedBy: token.name ?? "unknown",
      },
    });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Klinik Full Senyum" <${process.env.EMAIL_FROM}>`,
      to: body.email,
      subject: "Balasan dari Klinik Full Senyum",
      text: body.balasan,
    });

    return NextResponse.json(updated);
  } catch (error: any) {
    console.error("Gagal update dan kirim email:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, context: any) {
  const { id } = context.params;

  // Ambil token sesi login
  const token = await getToken({ req });

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await prisma.kontak.update({
      where: { id },
      data: { deletedIs: 1, deletedBy: token.name ?? "unknown" },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error during soft delete:', error);
    return NextResponse.json({ success: false, error: 'Delete failed' }, { status: 500 });
  }
}