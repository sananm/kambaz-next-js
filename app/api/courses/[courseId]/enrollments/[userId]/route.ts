import { NextRequest, NextResponse } from 'next/server';
import Database from '@/app/(Kambaz)/Database';

export async function DELETE(
  request: NextRequest,
  { params }: { params: { courseId: string; userId: string } }
) {
  const { enrollments } = Database;
  const { courseId, userId } = params;

  // Find the enrollment
  const enrollmentIndex = enrollments.findIndex(
    (e: any) => e.user === userId && e.course === courseId
  );

  if (enrollmentIndex === -1) {
    return NextResponse.json({ message: 'Enrollment not found' }, { status: 404 });
  }

  // Remove enrollment
  enrollments.splice(enrollmentIndex, 1);

  return NextResponse.json({ message: 'Unenrolled successfully' });
}
