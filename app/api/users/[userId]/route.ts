import { NextRequest, NextResponse } from 'next/server';
import Database from '@/app/(Kambaz)/Database';

export async function PUT(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  const updatedUser = await request.json();
  const { users } = Database;

  const userIndex = users.findIndex((u: any) => u._id === params.userId);

  if (userIndex === -1) {
    return NextResponse.json({ message: 'User not found' }, { status: 404 });
  }

  users[userIndex] = { ...users[userIndex], ...updatedUser };

  // Update cookie if updating current user
  const currentUserCookie = request.cookies.get('currentUser')?.value;
  if (currentUserCookie) {
    const currentUser = JSON.parse(currentUserCookie);
    if (currentUser._id === params.userId) {
      const response = NextResponse.json(users[userIndex]);
      response.cookies.set('currentUser', JSON.stringify(users[userIndex]), {
        httpOnly: false,
        maxAge: 60 * 60 * 24 * 7,
        path: '/',
      });
      return response;
    }
  }

  return NextResponse.json(users[userIndex]);
}
