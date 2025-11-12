import { NextRequest, NextResponse } from 'next/server';
import Database from '@/app/(Kambaz)/Database';

export async function POST(request: NextRequest) {
  const credentials = await request.json();
  const { users, courses, enrollments } = Database;

  const user = users.find(
    (u: any) => u.username === credentials.username && u.password === credentials.password
  );

  if (!user) {
    return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
  }

  // Auto-enroll faculty and admin in all courses
  if (user.role === 'FACULTY' || user.role === 'ADMIN') {
    courses.forEach((course: any) => {
      // Check if already enrolled
      const alreadyEnrolled = enrollments.some(
        (e: any) => e.user === user._id && e.course === course._id
      );

      // If not enrolled, create enrollment
      if (!alreadyEnrolled) {
        enrollments.push({
          _id: new Date().getTime().toString() + Math.random(),
          user: user._id,
          course: course._id,
        });
      }
    });
  }

  const response = NextResponse.json(user);
  response.cookies.set('currentUser', JSON.stringify(user), {
    httpOnly: false,
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: '/',
  });

  return response;
}
