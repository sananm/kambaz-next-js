import { NextRequest, NextResponse } from 'next/server';
import Database from '@/app/(Kambaz)/Database';

export async function GET(
  request: NextRequest,
  { params }: { params: { courseId: string } }
) {
  const { assignments } = Database;
  const courseId = params.courseId;

  // Filter assignments for this specific course
  const courseAssignments = assignments.filter((assignment: any) => assignment.course === courseId);

  return NextResponse.json(courseAssignments);
}

export async function POST(
  request: NextRequest,
  { params }: { params: { courseId: string } }
) {
  const newAssignment = await request.json();
  const { assignments } = Database;

  // Generate a new ID if not provided
  if (!newAssignment._id) {
    newAssignment._id = new Date().getTime().toString();
  }

  // Ensure the assignment is associated with the correct course
  newAssignment.course = params.courseId;

  assignments.push(newAssignment);
  return NextResponse.json(newAssignment, { status: 201 });
}
