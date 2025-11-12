import { NextRequest, NextResponse } from 'next/server';
import Database from '@/app/(Kambaz)/Database';

export async function POST(
  request: NextRequest,
  { params }: { params: { courseId: string } }
) {
  const { userId } = await request.json();
  const { enrollments } = Database;
  const courseId = params.courseId;

  // Check if already enrolled
  const existingEnrollment = enrollments.find(
    (e: any) => e.user === userId && e.course === courseId
  );

  if (existingEnrollment) {
    return NextResponse.json({ message: 'User already enrolled' }, { status: 400 });
  }

  // Create new enrollment
  const newEnrollment = {
    _id: new Date().getTime().toString(),
    user: userId,
    course: courseId,
  };

  enrollments.push(newEnrollment);

  return NextResponse.json(newEnrollment, { status: 201 });
}
