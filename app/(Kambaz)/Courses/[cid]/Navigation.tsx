'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface CourseNavigationProps {
  courseId: string;
}

export default function CourseNavigation({ courseId }: CourseNavigationProps) {
  const pathname = usePathname();
  const links = ["Home", "Modules", "Piazza", "Zoom", "Assignments", "Quizzes", "Grades", "People"];
  
  // Extract course ID from current path
  // pathname will be like /Courses/1234/Home or /Courses/1234/Modules
  const pathSegments = pathname.split('/');
  const extractedCourseId = pathSegments[2]; // Gets the ID from /Courses/[ID]/...
  
  return (
    <div id='wd-courses-navigation' className='wd list-group fs-5 rounded-0'>
      {links.map((link, index) => {
        const linkPath = link === "People" 
          ? `/Courses/${extractedCourseId}/People/Table`
          : `/Courses/${extractedCourseId}/${link}`;
        
        const linkId = `wd-course-${link.toLowerCase()}-link`;
        const isActive = pathname.includes(`/${link}`);
        
        return (
          <>
            <Link
              key={link}
              href={linkPath}
              id={linkId}
              className={`list-group-item border-0 ${
                isActive ? 'active' : 'text-danger'
              }`}
            >
              {link}
            </Link>
            {index < links.length - 1 && <br />}
          </>
        );
      })}
    </div>
  );
}