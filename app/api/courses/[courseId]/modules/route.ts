import { NextRequest, NextResponse } from 'next/server';
import Database from '@/app/(Kambaz)/Database';

export async function GET(
  request: NextRequest,
  { params }: { params: { courseId: string } }
) {
  const { modules } = Database;
  const courseId = params.courseId;

  // Filter modules for this specific course
  const courseModules = modules.filter((module: any) => module.course === courseId);

  return NextResponse.json(courseModules);
}

export async function POST(
  request: NextRequest,
  { params }: { params: { courseId: string } }
) {
  const newModule = await request.json();
  const { modules } = Database;

  // Generate a new ID if not provided
  if (!newModule._id) {
    newModule._id = new Date().getTime().toString();
  }

  // Ensure the module is associated with the correct course
  newModule.course = params.courseId;

  // Initialize lessons array if not present
  if (!newModule.lessons) {
    newModule.lessons = [];
  }

  modules.push(newModule);
  return NextResponse.json(newModule, { status: 201 });
}
