import { NextRequest, NextResponse } from 'next/server';
import Database from '@/app/(Kambaz)/Database';

export async function PUT(
  request: NextRequest,
  { params }: { params: { courseId: string } }
) {
  const updatedCourse = await request.json();
  const { courses } = Database;
  const courseId = params.courseId;

  // Find the course index
  const courseIndex = courses.findIndex((c: any) => c._id === courseId);

  if (courseIndex === -1) {
    return NextResponse.json({ message: 'Course not found' }, { status: 404 });
  }

  // Update the course
  courses[courseIndex] = { ...courses[courseIndex], ...updatedCourse };

  return NextResponse.json(courses[courseIndex]);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { courseId: string } }
) {
  const { courses, enrollments } = Database;
  const courseId = params.courseId;

  // Find the course index
  const courseIndex = courses.findIndex((c: any) => c._id === courseId);

  if (courseIndex === -1) {
    return NextResponse.json({ message: 'Course not found' }, { status: 404 });
  }

  // Remove the course
  courses.splice(courseIndex, 1);

  // Remove all enrollments for this course
  const enrollmentIndicesToRemove = enrollments
    .map((e: any, index: number) => (e.course === courseId ? index : -1))
    .filter((index: number) => index !== -1)
    .reverse(); // Reverse to avoid index shifting issues

  enrollmentIndicesToRemove.forEach((index: number) => {
    enrollments.splice(index, 1);
  });

  return NextResponse.json({ message: 'Course deleted successfully' });
}
