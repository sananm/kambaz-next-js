'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { FaCheckCircle, FaEllipsisV, FaPlus, FaSearch, FaTrash } from 'react-icons/fa';
import { BsGripVertical } from 'react-icons/bs';
import { IoDocumentText } from 'react-icons/io5';
import { useSelector, useDispatch } from 'react-redux';
import { setAssignments, deleteAssignment as deleteAssignmentAction } from './reducer';
import * as client from './client';

export default function Assignments({ params }: { params: { cid: string } }) {
  const router = useRouter();
  const dispatch = useDispatch();

  // Get assignments from Redux store
  const { assignments } = useSelector((state: any) => state.assignmentsReducer);

  // Fetch assignments from server on mount
  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const courseAssignments = await client.findAssignmentsForCourse(params.cid);
        dispatch(setAssignments(courseAssignments));
      } catch (error) {
        console.error('Error fetching assignments:', error);
      }
    };
    fetchAssignments();
  }, [params.cid, dispatch]);

  // Filter assignments for the current course (local filtering for immediate UI updates)
  const courseAssignments = (assignments || []).filter(
    (assignment: any) => assignment.course === params.cid
  );

  // Format date for display
  const formatDate = (dateString: string) => {
    if (!dateString) return 'No date set';
    
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
    
    // Check if time is included in the date string
    if (dateString.includes('T')) {
      return `${formattedDate} at ${formattedTime}`;
    } else {
      return `${formattedDate} at 11:59 pm`;
    }
  };

  // Handle Add Assignment click
  const handleAddAssignment = () => {
    router.push(`/Courses/${params.cid}/Assignments/new`);
  };

  // Handle Delete Assignment
  const handleDeleteAssignment = async (assignmentId: string, assignmentTitle: string) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to remove the assignment "${assignmentTitle}"?`
    );

    if (confirmDelete) {
      try {
        await client.deleteAssignment(params.cid, assignmentId);
        dispatch(deleteAssignmentAction(assignmentId));
      } catch (error) {
        console.error('Error deleting assignment:', error);
        alert('Failed to delete assignment');
      }
    }
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
          <button 
            className='btn btn-danger' 
            id='wd-add-assignment'
            onClick={handleAddAssignment}
          >
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
        {courseAssignments.length === 0 ? (
          <li className='list-group-item'>
            <div className='text-center text-muted py-3'>
              No assignments yet. Click + Assignment to create one.
            </div>
          </li>
        ) : (
          courseAssignments.map((assignment: any) => (
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
                    {assignment.title}
                  </Link>
                  <div className='small text-muted mt-1'>
                    <span className='text-danger'>Multiple Modules</span> | 
                    {assignment.availableFrom && (
                      <>
                        <strong> Not available until</strong> {formatDate(assignment.availableFrom)} |
                      </>
                    )}
                  </div>
                  <div className='small text-muted'>
                    <strong>Due</strong> {formatDate(assignment.dueDate)} | {assignment.points || 100} pts
                  </div>
                </div>
                <div className='d-flex align-items-center'>
                  <FaCheckCircle className='text-success me-2' />
                  <FaTrash 
                    className='text-danger me-2' 
                    style={{ cursor: 'pointer' }}
                    onClick={() => handleDeleteAssignment(assignment._id, assignment.title)}
                    id={`wd-delete-assignment-${assignment._id}`}
                  />
                  <FaEllipsisV className='text-muted' />
                </div>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}