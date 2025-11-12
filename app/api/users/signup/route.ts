import { NextRequest, NextResponse } from 'next/server';
import Database from '@/app/(Kambaz)/Database';

export async function POST(request: NextRequest) {
  const newUser = await request.json();
  const { users } = Database;

  // Check if user already exists
  const existingUser = users.find((u: any) => u.username === newUser.username);
  if (existingUser) {
    return NextResponse.json({ message: 'Username already exists' }, { status: 400 });
  }

  // Add new user
  newUser._id = new Date().getTime().toString();
  users.push(newUser);

  const response = NextResponse.json(newUser);
  response.cookies.set('currentUser', JSON.stringify(newUser), {
    httpOnly: false,
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: '/',
  });

  return response;
}
