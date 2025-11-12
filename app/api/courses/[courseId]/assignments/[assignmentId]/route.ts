import { NextRequest, NextResponse } from 'next/server';
import Database from '@/app/(Kambaz)/Database';

export async function PUT(
  request: NextRequest,
  { params }: { params: { courseId: string; assignmentId: string } }
) {
  const updatedAssignment = await request.json();
  const { assignments } = Database;
  const assignmentId = params.assignmentId;

  // Find the assignment index
  const assignmentIndex = assignments.findIndex((a: any) => a._id === assignmentId);

  if (assignmentIndex === -1) {
    return NextResponse.json({ message: 'Assignment not found' }, { status: 404 });
  }

  // Update the assignment
  assignments[assignmentIndex] = { ...assignments[assignmentIndex], ...updatedAssignment };

  return NextResponse.json(assignments[assignmentIndex]);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { courseId: string; assignmentId: string } }
) {
  const { assignments } = Database;
  const assignmentId = params.assignmentId;

  // Find the assignment index
  const assignmentIndex = assignments.findIndex((a: any) => a._id === assignmentId);

  if (assignmentIndex === -1) {
    return NextResponse.json({ message: 'Assignment not found' }, { status: 404 });
  }

  // Remove the assignment
  assignments.splice(assignmentIndex, 1);

  return NextResponse.json({ message: 'Assignment deleted successfully' });
}
