// app/api/users/route.ts
import { prisma } from "@/lib/prisma";
import { sendEmailOTP } from "@/lib/mail";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  try {
    const { name, email, password, role, dokterKode, deletedIs } = await req.json();

    const existingUser = await prisma.user.findUnique({
      where: { email, deletedIs: 2 },
    });
    if (existingUser) {
      return NextResponse.json({ error: "Email sudah digunakan" }, { status: 400 });
    }

    const upperRole = role?.toUpperCase();
    if (!["ADMIN", "DOKTER", "PERAWAT"].includes(upperRole)) {
      return NextResponse.json({ error: "Role tidak valid" }, { status: 400 });
    }

    const now = new Date();
    const wibDate = new Date(now.getTime() + 7 * 60 * 60 * 1000);

    const hashed = await bcrypt.hash(password, 10);
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiry = new Date(wibDate.getTime() + 15 * 60 * 1000);

    await prisma.user.create({
      data: {
        name,
        email,
        password: hashed,
        otp,
        otpExpiry,
        role: upperRole,
        dokterKode,
        verified: false,
        createdAt: wibDate,
        createdBy: 'Anonymous',
      },
    });

    await sendEmailOTP(email, otp);

    return NextResponse.json({ message: "User created & OTP sent" });
  } catch (error) {
    console.error("API /api/users error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function GET() {
  const users = await prisma.user.findMany({
    where: { deletedIs: 2 }, // pastikan ini sesuai dengan model
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      verified: true,
    },
  });

  return NextResponse.json(users);
}

