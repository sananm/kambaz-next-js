import { NextResponse } from 'next/server';
import Database from '@/app/(Kambaz)/Database';

export async function GET() {
  const { users } = Database;
  return NextResponse.json(users);
}
