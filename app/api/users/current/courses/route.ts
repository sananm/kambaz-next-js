import { NextRequest, NextResponse } from 'next/server';
import Database from '@/app/(Kambaz)/Database';

export async function GET(request: NextRequest) {
  const currentUserCookie = request.cookies.get('currentUser')?.value;

  if (!currentUserCookie) {
    return NextResponse.json({ message: 'Not authenticated' }, { status: 401 });
  }

  const currentUser = JSON.parse(currentUserCookie);
  const { courses, enrollments } = Database;

  // Return enrolled courses for all users
  // Find all enrollments for the current user
  const userEnrollments = enrollments.filter(
    (enrollment: any) => enrollment.user === currentUser._id
  );

  // Get the courses for those enrollments
  const userCourses = courses.filter((course: any) =>
    userEnrollments.some((enrollment: any) => enrollment.course === course._id)
  );

  return NextResponse.json(userCourses);
}
