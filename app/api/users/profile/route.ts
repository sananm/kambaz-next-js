import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const currentUser = request.cookies.get('currentUser')?.value;

  if (!currentUser) {
    return NextResponse.json({ message: 'Not authenticated' }, { status: 401 });
  }

  return NextResponse.json(JSON.parse(currentUser));
}
