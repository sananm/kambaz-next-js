import Link from 'next/link';
import { FaCheckCircle, FaEllipsisV, FaPlus, FaSearch } from 'react-icons/fa';
import { BsGripVertical } from 'react-icons/bs';
import { IoDocumentText } from 'react-icons/io5';
import { assignments as assignmentsData } from '../../../Database';

export default function Assignments({ params }: { params: { cid: string } }) {
  // Get assignments array from the imported data
  const assignments = assignmentsData.assignments || assignmentsData;
  
  // Filter assignments for the current course
  const courseAssignments = assignments.filter(
    assignment => assignment.course === params.cid
  );

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = { 
      month: 'short', 
      day: 'numeric' 
    };
    const timeOptions: Intl.DateTimeFormatOptions = {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    };
    
    const formattedDate = date.toLocaleDateString('en-US', options);
    const formattedTime = date.toLocaleTimeString('en-US', timeOptions).toLowerCase();
    
    return `${formattedDate} at ${formattedTime}`;
  };

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

        {/* Assignment Items */}
        {courseAssignments.map((assignment) => (
          <li 
            key={assignment._id}
            className='list-group-item wd-assignment-list-item' 
            style={{ borderLeft: '3px solid #198754' }}
          >
            <div className='d-flex align-items-start py-2'>
              <BsGripVertical className='me-2 text-muted mt-1' />
              <IoDocumentText className='me-3 text-success fs-5 mt-1' />
              <div className='flex-grow-1'>
                <Link
                  href={`/Courses/${params.cid}/Assignments/${assignment._id}`}
                  className='wd-assignment-link text-decoration-none fw-bold text-dark'
                >
                  {assignment._id} - {assignment.title}
                </Link>
                <div className='small text-muted mt-1'>
                  <span className='text-danger'>Multiple Modules</span> | 
                  <strong> Not available until</strong> {formatDate(assignment.availableFrom + 'T00:00:00')} |
                </div>
                <div className='small text-muted'>
                  <strong>Due</strong> {formatDate(assignment.dueDate)} | {assignment.points} pts
                </div>
              </div>
              <div className='d-flex align-items-center'>
                <FaCheckCircle className='text-success me-2' />
                <FaEllipsisV className='text-muted' />
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}