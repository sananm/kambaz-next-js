import Link from 'next/link';
import { FaCheckCircle, FaEllipsisV, FaPlus, FaSearch } from 'react-icons/fa';
import { BsGripVertical } from 'react-icons/bs';
import { IoDocumentText } from 'react-icons/io5';

export default function Assignments() {
  return (
    <div id='wd-assignments' className='container-fluid px-4'>
      {/* Search and Action Buttons */}
      <div className='d-flex justify-content-between align-items-center mb-4'>
        <div className='input-group' style={{ maxWidth: '300px' }}>
          <span className='input-group-text bg-white'>
            <FaSearch />
          </span>
          <input 
            type='text'
            className='form-control border-start-0' 
            placeholder='Search for Assignments' 
            id='wd-search-assignment'
            style={{ borderLeft: 'none' }}
          />
        </div>
        <div>
          <button className='btn btn-secondary me-1' id='wd-add-assignment-group'>
            <FaPlus className='me-1' /> Group
          </button>
          <button className='btn btn-danger' id='wd-add-assignment'>
            <FaPlus className='me-1' /> Assignment
          </button>
        </div>
      </div>

      {/* Assignments Section */}
      <ul className='list-group rounded-0' id='wd-assignment-list'>
        {/* Section Header */}
        <li className='list-group-item bg-light py-2'>
          <div className='d-flex justify-content-between align-items-center'>
            <div className='d-flex align-items-center'>
              <BsGripVertical className='me-2 text-muted' />
              <strong>ASSIGNMENTS</strong>
              <span className='ms-3 badge rounded-pill bg-secondary'>40% of Total</span>
            </div>
            <div className='d-flex align-items-center'>
              <FaPlus className='me-3' />
              <FaEllipsisV />
            </div>
          </div>
        </li>

        {/* Assignment 1 - WITH GREEN BORDER */}
        <li className='list-group-item wd-assignment-list-item' style={{ borderLeft: '3px solid #198754' }}>
          <div className='d-flex align-items-start py-2'>
            <BsGripVertical className='me-2 text-muted mt-1' />
            <IoDocumentText className='me-3 text-success fs-5 mt-1' />
            <div className='flex-grow-1'>
              <Link
                href='/Courses/1234/Assignments/A1'
                className='wd-assignment-link text-decoration-none fw-bold text-dark'
              >
                A1 - ENV + HTML
              </Link>
              <div className='small text-muted mt-1'>
                <span className='text-danger'>Multiple Modules</span> | 
                <strong> Not available until</strong> Sept 19 at 12:00am |
              </div>
              <div className='small text-muted'>
                <strong>Due</strong> Sept 26 at 11:59pm | 100 pts
              </div>
            </div>
            <div className='d-flex align-items-center'>
              <FaCheckCircle className='text-success me-2' />
              <FaEllipsisV className='text-muted' />
            </div>
          </div>
        </li>

        {/* Assignment 2 - WITH GREEN BORDER */}
        <li className='list-group-item wd-assignment-list-item' style={{ borderLeft: '3px solid #198754' }}>
          <div className='d-flex align-items-start py-2'>
            <BsGripVertical className='me-2 text-muted mt-1' />
            <IoDocumentText className='me-3 text-success fs-5 mt-1' />
            <div className='flex-grow-1'>
              <Link
                href='/Courses/1234/Assignments/A2'
                className='wd-assignment-link text-decoration-none fw-bold text-dark'
              >
                A2 - CSS + BOOTSTRAP
              </Link>
              <div className='small text-muted mt-1'>
                <span className='text-danger'>Multiple Modules</span> | 
                <strong> Not available until</strong> Sept 26 at 12:00am |
              </div>
              <div className='small text-muted'>
                <strong>Due</strong> Oct 3 at 11:59pm | 100 pts
              </div>
            </div>
            <div className='d-flex align-items-center'>
              <FaCheckCircle className='text-success me-2' />
              <FaEllipsisV className='text-muted' />
            </div>
          </div>
        </li>

        {/* Assignment 3 - WITH GREEN BORDER */}
        <li className='list-group-item wd-assignment-list-item' style={{ borderLeft: '3px solid #198754' }}>
          <div className='d-flex align-items-start py-2'>
            <BsGripVertical className='me-2 text-muted mt-1' />
            <IoDocumentText className='me-3 text-success fs-5 mt-1' />
            <div className='flex-grow-1'>
              <Link
                href='/Courses/1234/Assignments/A3'
                className='wd-assignment-link text-decoration-none fw-bold text-dark'
              >
                A3 - REACT + TYPESCRIPT
              </Link>
              <div className='small text-muted mt-1'>
                <span className='text-danger'>Multiple Modules</span> | 
                <strong> Not available until</strong> Oct 3 at 12:00am |
              </div>
              <div className='small text-muted'>
                <strong>Due</strong> Oct 10 at 11:59pm | 100 pts
              </div>
            </div>
            <div className='d-flex align-items-center'>
              <FaCheckCircle className='text-success me-2' />
              <FaEllipsisV className='text-muted' />
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
}