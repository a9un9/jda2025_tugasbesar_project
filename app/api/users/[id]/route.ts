
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  req: NextRequest,
  context: any
) {
  const { id } = await context.params;

  if (!id) {
    return NextResponse.json({ error: 'ID tidak ditemukan' }, { status: 400 });
  }

  const user = await prisma.user.findUnique({
    where: { id },
  });

  if (!user) {
    return NextResponse.json({ error: 'User tidak ditemukan' }, { status: 404 });
  }

  return NextResponse.json(user);
}

export async function PUT(
  req: NextRequest,
  context: any
) {
  const { id } = await context.params;
  const body = await req.json();

  const updated = await prisma.user.update({
    where: { id },
    data: {
        name: body.name,
        email: body.email,
        role: body.role.toUpperCase(),
    },
  });

  return NextResponse.json(updated);
}

export async function PATCH(
  req: NextRequest,
  context: any
) {
  const { id } = await context.params;

  try {
    await prisma.user.update({
      where: { id },
      data: { verified: true },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Gagal memverifikasi user' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, context: any) {
  const { id } = context.params;

  try {
    await prisma.user.update({
      where: { id },
      data: { deletedIs: 1 },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error during soft delete:', error);
    return NextResponse.json({ success: false, error: 'Delete failed' }, { status: 500 });
  }
}