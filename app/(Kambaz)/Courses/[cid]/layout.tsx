'use client';
import { ReactNode, useState } from 'react';
import { usePathname } from 'next/navigation';
import CourseNavigation from './Navigation';
import { FaBars, FaTimes } from 'react-icons/fa';
import { AiOutlineDashboard } from 'react-icons/ai';
import { IoCalendarOutline } from 'react-icons/io5';
import { LiaBookSolid, LiaCogSolid } from 'react-icons/lia';
import { FaInbox, FaRegCircleUser } from 'react-icons/fa6';
import Link from 'next/link';
import { courses } from '../../Database';

export default function CoursesLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { cid: string };
}) {
  const [showMainNav, setShowMainNav] = useState(false);
  const [showCourseNav, setShowCourseNav] = useState(false);
  const course = courses.find((course) => course._id === params.cid);
  const pathname = usePathname();

  // Extract the current section from pathname for breadcrumb
  const pathSegments = pathname.split('/').filter((segment) => segment);
  let currentSection = '';
  if (pathSegments.length >= 3) {
    if (pathSegments[2] === 'People' && pathSegments[3] === 'Table') {
      currentSection = 'People';
    } else {
      currentSection = pathSegments[2];
    }
  }

  return (
    <div id='wd-courses'>
      {/* Mobile header bar - only visible on small screens */}
      <div
        className='d-md-none bg-black text-white p-2 d-flex justify-content-between align-items-center'
        style={{
          marginLeft: '-1rem',
          marginRight: '-1rem',
          marginTop: '-1rem',
        }}
      >
        {/* Left button with dropdown for main navigation */}
        <div className='position-relative'>
          <button
            className='btn btn-link text-white p-0'
            onClick={() => {
              setShowMainNav(!showMainNav);
              setShowCourseNav(false);
            }}
            aria-label='Toggle main navigation'
          >
            <FaBars size={20} />
          </button>

          {showMainNav && (
            <div
              className='position-absolute top-100 start-0 bg-white shadow-lg rounded mt-2 p-2'
              style={{
                width: '200px',
                zIndex: 1000,
              }}
            >
              <Link
                href='/Dashboard'
                className='d-flex align-items-center text-decoration-none text-dark p-2 rounded hover-bg-light'
              >
                <AiOutlineDashboard className='me-2' />
                Dashboard
              </Link>
              <Link
                href='/Account'
                className='d-flex align-items-center text-decoration-none text-dark p-2 rounded hover-bg-light'
              >
                <FaRegCircleUser className='me-2' />
                Account
              </Link>
              <Link
                href='/Dashboard'
                className='d-flex align-items-center text-decoration-none text-dark p-2 rounded hover-bg-light'
              >
                <LiaBookSolid className='me-2' />
                Courses
              </Link>
              <Link
                href='https://registrar.northeastern.edu/article/academic-calendar/'
                target='_blank'
                className='d-flex align-items-center text-decoration-none text-dark p-2 rounded hover-bg-light'
              >
                <IoCalendarOutline className='me-2' />
                Calendar
              </Link>
              <Link
                href='https://outlook.office.com/mail/'
                target='_blank'
                className='d-flex align-items-center text-decoration-none text-dark p-2 rounded hover-bg-light'
              >
                <FaInbox className='me-2' />
                Inbox
              </Link>
              <Link
                href='/Labs'
                className='d-flex align-items-center text-decoration-none text-dark p-2 rounded hover-bg-light'
              >
                <LiaCogSolid className='me-2' />
                Labs
              </Link>
            </div>
          )}
        </div>

        {/* Center content */}
        <div className='text-center'>
          <div style={{ fontSize: '11px', opacity: 0.8 }}>CS5610</div>
          <div style={{ fontSize: '14px', fontWeight: 500 }}>Modules</div>
        </div>

        {/* Right button with dropdown for course navigation */}
        <div className='position-relative'>
          <button
            className='btn btn-link text-white p-0'
            onClick={() => {
              setShowCourseNav(!showCourseNav);
              setShowMainNav(false);
            }}
            aria-label='Toggle course navigation'
          >
            <FaBars size={20} />
          </button>

          {showCourseNav && (
            <div
              className='position-absolute top-100 end-0 bg-white shadow-lg border rounded mt-2'
              style={{
                width: '200px',
                zIndex: 1000,
              }}
            >
              <CourseNavigation courseId={''} />
            </div>
          )}
        </div>
      </div>

      {/* Desktop breadcrumb - only visible on medium screens and up */}
      {course?.name && currentSection && (
        <div className='text-danger fs-4 mb-2 d-none d-md-block'>
          ☰ {course.name} &gt; {currentSection}
        </div>
      )}

      {/* Desktop header - only visible on medium screens and up */}

      <hr className='d-none d-md-block' />

      <div className='d-flex'>
        {/* Desktop course navigation */}
        <div
          className='d-none d-md-block'
          style={{ width: '200px', flexShrink: 0 }}
        >
          <CourseNavigation courseId={''} />
        </div>

        {/* Main content */}
        <div className='flex-fill'>{children}</div>
      </div>
    </div>
  );
}
