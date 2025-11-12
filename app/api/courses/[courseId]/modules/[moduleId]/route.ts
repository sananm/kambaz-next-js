import { NextRequest, NextResponse } from 'next/server';
import Database from '@/app/(Kambaz)/Database';

export async function PUT(
  request: NextRequest,
  { params }: { params: { courseId: string; moduleId: string } }
) {
  const updatedModule = await request.json();
  const { modules } = Database;
  const moduleId = params.moduleId;

  // Find the module index
  const moduleIndex = modules.findIndex((m: any) => m._id === moduleId);

  if (moduleIndex === -1) {
    return NextResponse.json({ message: 'Module not found' }, { status: 404 });
  }

  // Update the module
  modules[moduleIndex] = { ...modules[moduleIndex], ...updatedModule };

  return NextResponse.json(modules[moduleIndex]);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { courseId: string; moduleId: string } }
) {
  const { modules } = Database;
  const moduleId = params.moduleId;

  // Find the module index
  const moduleIndex = modules.findIndex((m: any) => m._id === moduleId);

  if (moduleIndex === -1) {
    return NextResponse.json({ message: 'Module not found' }, { status: 404 });
  }

  // Remove the module
  modules.splice(moduleIndex, 1);

  return NextResponse.json({ message: 'Module deleted successfully' });
}
