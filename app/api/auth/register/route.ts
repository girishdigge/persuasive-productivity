import prisma from '@/lib/db';
import { signUpSchema } from '@/schema/signUpSchema';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
  const body: unknown = await request.json();
  const result = signUpSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json('Missing fields, Wrong Data', { status: 203 });
  }
  const { email, password, username } = result.data;

  try {
    const existingUserName = await prisma.user.findUnique({
      where: {
        username,
      },
    });
    if (existingUserName)
      return NextResponse.json('Username is already taken.', { status: 202 });

    const existingUserEmail = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (existingUserEmail)
      return NextResponse.json('Email is already taken.', { status: 201 });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: { username, email, hashedPassword },
    });
    console.log(newUser);
    return NextResponse.json(newUser, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json('Something went wrong.', { status: 204 });
  }
}
