import { NextRequest, NextResponse } from 'next/server';
import Database from '@/app/(Kambaz)/Database';

export async function GET() {
  const courses = Database.courses;
  return NextResponse.json(courses);
}

export async function POST(request: NextRequest) {
  const newCourse = await request.json();
  const { courses, enrollments } = Database;

  // Generate a new ID if not provided
  if (!newCourse._id || newCourse._id === '0') {
    newCourse._id = new Date().getTime().toString();
  }

  courses.push(newCourse);

  // Get current user and enroll them in the new course
  const currentUserCookie = request.cookies.get('currentUser')?.value;
  if (currentUserCookie) {
    const currentUser = JSON.parse(currentUserCookie);
    const enrollment = {
      _id: new Date().getTime().toString() + '_enrollment',
      user: currentUser._id,
      course: newCourse._id,
    };
    enrollments.push(enrollment);
  }

  return NextResponse.json(newCourse, { status: 201 });
}
