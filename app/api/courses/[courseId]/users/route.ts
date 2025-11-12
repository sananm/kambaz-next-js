import { NextRequest, NextResponse } from 'next/server';
import Database from '@/app/(Kambaz)/Database';

export async function GET(
  request: NextRequest,
  { params }: { params: { courseId: string } }
) {
  const { users, enrollments } = Database;
  const courseId = params.courseId;

  // Find all enrollments for this course
  const courseEnrollments = enrollments.filter(
    (enrollment: any) => enrollment.course === courseId
  );

  // Get the users for those enrollments
  const enrolledUsers = users.filter((user: any) =>
    courseEnrollments.some((enrollment: any) => enrollment.user === user._id)
  );

  return NextResponse.json(enrolledUsers);
}
