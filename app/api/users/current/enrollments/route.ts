import { NextRequest, NextResponse } from 'next/server';
import Database from '@/app/(Kambaz)/Database';

// Enroll current user in a course
export async function POST(request: NextRequest) {
  const { courseId } = await request.json();
  const currentUserCookie = request.cookies.get('currentUser')?.value;

  if (!currentUserCookie) {
    return NextResponse.json({ message: 'Not authenticated' }, { status: 401 });
  }

  const currentUser = JSON.parse(currentUserCookie);
  const { enrollments } = Database;

  // Check if already enrolled
  const existingEnrollment = enrollments.find(
    (e: any) => e.user === currentUser._id && e.course === courseId
  );

  if (existingEnrollment) {
    return NextResponse.json({ message: 'Already enrolled' }, { status: 400 });
  }

  // Create new enrollment
  const newEnrollment = {
    _id: new Date().getTime().toString(),
    user: currentUser._id,
    course: courseId,
  };

  enrollments.push(newEnrollment);

  return NextResponse.json(newEnrollment, { status: 201 });
}

// Unenroll current user from a course
export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const courseId = searchParams.get('courseId');

  if (!courseId) {
    return NextResponse.json({ message: 'Course ID required' }, { status: 400 });
  }

  const currentUserCookie = request.cookies.get('currentUser')?.value;

  if (!currentUserCookie) {
    return NextResponse.json({ message: 'Not authenticated' }, { status: 401 });
  }

  const currentUser = JSON.parse(currentUserCookie);
  const { enrollments } = Database;

  // Find the enrollment
  const enrollmentIndex = enrollments.findIndex(
    (e: any) => e.user === currentUser._id && e.course === courseId
  );

  if (enrollmentIndex === -1) {
    return NextResponse.json({ message: 'Not enrolled in this course' }, { status: 404 });
  }

  // Remove enrollment
  enrollments.splice(enrollmentIndex, 1);

  return NextResponse.json({ message: 'Unenrolled successfully' });
}
