'use client';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { assignments as assignmentsData } from '../../../../Database';

export default function AssignmentEditor() {
  const { cid, aid } = useParams<{ cid: string; aid: string }>();
  
  // Get assignments array from the imported data
  const assignments = assignmentsData.assignments || assignmentsData;
  
  // Find the specific assignment
  const assignment = assignments.find(a => a._id === aid);
  
  // If assignment not found, show error
  if (!assignment) {
    return (
      <div className='container-fluid px-4'>
        <div className='alert alert-danger'>
          Assignment not found
        </div>
        <Link href={`/Courses/${cid}/Assignments`} className='btn btn-secondary'>
          Back to Assignments
        </Link>
      </div>
    );
  }

  return (
    <div id='wd-assignments-editor' className='container-fluid px-4'>
      {/* Breadcrumb */}
      <nav aria-label='breadcrumb'>
        <ol className='breadcrumb'>
          <li className='breadcrumb-item'>
            <Link href={`/Courses/${cid}/Assignments`}>Assignments</Link>
          </li>
          <li className='breadcrumb-item active'>{aid}</li>
        </ol>
      </nav>

      {/* Course Name - You can replace this with actual course name if needed */}
      <h2 className='mb-4'>Course {cid}</h2>
      
      <hr className='mb-4' />

      {/* Assignment Name */}
      <div className='row mb-3'>
        <label htmlFor='wd-name' className='col-md-2 col-form-label text-md-end'>
          Assignment Name
        </label>
        <div className='col-md-10'>
          <input 
            id='wd-name' 
            className='form-control' 
            defaultValue={`${assignment._id} - ${assignment.title}`}
          />
        </div>
      </div>

      {/* Description */}
      <div className='row mb-3'>
        <label htmlFor='wd-description' className='col-md-2 col-form-label text-md-end'>
          Description
        </label>
        <div className='col-md-10'>
          <textarea 
            id='wd-description' 
            className='form-control' 
            rows={10}
            defaultValue={assignment.description || 'The assignment is available online Submit a link to the landing page of your Web application running on Netlify. The landing page should include the following: Your full name and section Links to each of the lab assignments Link to the Kanbas application Links to all relevant source code repositories The Kanbas application should include a link to navigate back to the landing page.'}
          />
        </div>
      </div>

      {/* Points */}
      <div className='row mb-3'>
        <label htmlFor='wd-points' className='col-md-2 col-form-label text-md-end'>
          Points
        </label>
        <div className='col-md-10'>
          <input 
            id='wd-points' 
            type='number'
            className='form-control' 
            defaultValue={assignment.points}
          />
        </div>
      </div>

      {/* Assignment Group */}
      <div className='row mb-3'>
        <label htmlFor='wd-group' className='col-md-2 col-form-label text-md-end'>
          Assignment Group
        </label>
        <div className='col-md-10'>
          <select id='wd-group' className='form-select'>
            <option value='ASSIGNMENTS'>ASSIGNMENTS</option>
            <option value='QUIZZES'>QUIZZES</option>
            <option value='EXAMS'>EXAMS</option>
          </select>
        </div>
      </div>

      {/* Display Grade as */}
      <div className='row mb-3'>
        <label htmlFor='wd-display-grade-as' className='col-md-2 col-form-label text-md-end'>
          Display Grade as
        </label>
        <div className='col-md-10'>
          <select id='wd-display-grade-as' className='form-select'>
            <option value='PERCENTAGE'>Percentage</option>
            <option value='POINTS'>Points</option>
          </select>
        </div>
      </div>

      {/* Submission Type */}
      <div className='row mb-3'>
        <label htmlFor='wd-submission-type' className='col-md-2 col-form-label text-md-end'>
          Submission Type
        </label>
        <div className='col-md-10'>
          <div className='border rounded p-3'>
            <select id='wd-submission-type' className='form-select mb-3'>
              <option value='ONLINE'>Online</option>
              <option value='ON_PAPER'>On Paper</option>
              <option value='NO_SUBMISSION'>No Submission</option>
            </select>
            
            <div>
              <strong className='mb-3 d-block'>Online Entry Options</strong>
              <div className='form-check mb-2'>
                <input
                  type='checkbox'
                  className='form-check-input'
                  name='online-options'
                  id='wd-text-entry'
                />
                <label className='form-check-label' htmlFor='wd-text-entry'>
                  Text Entry
                </label>
              </div>
              <div className='form-check mb-2'>
                <input
                  type='checkbox'
                  className='form-check-input'
                  name='online-options'
                  id='wd-website-url'
                  defaultChecked
                />
                <label className='form-check-label' htmlFor='wd-website-url'>
                  Website URL
                </label>
              </div>
              <div className='form-check mb-2'>
                <input
                  type='checkbox'
                  className='form-check-input'
                  name='online-options'
                  id='wd-media-recordings'
                />
                <label className='form-check-label' htmlFor='wd-media-recordings'>
                  Media Recordings
                </label>
              </div>
              <div className='form-check mb-2'>
                <input
                  type='checkbox'
                  className='form-check-input'
                  name='online-options'
                  id='wd-student-annotation'
                />
                <label className='form-check-label' htmlFor='wd-student-annotation'>
                  Student Annotation
                </label>
              </div>
              <div className='form-check'>
                <input
                  type='checkbox'
                  className='form-check-input'
                  name='online-options'
                  id='wd-file-upload'
                />
                <label className='form-check-label' htmlFor='wd-file-upload'>
                  File Uploads
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Assign */}
      <div className='row mb-3'>
        <label htmlFor='wd-assign-to' className='col-md-2 col-form-label text-md-end'>
          Assign
        </label>
        <div className='col-md-10'>
          <div className='border rounded p-3'>
            <label htmlFor='wd-assign-to' className='form-label fw-bold'>Assign to</label>
            <input 
              id='wd-assign-to' 
              className='form-control mb-3'
              defaultValue='Everyone' 
            />
            
            <label htmlFor='wd-due-date' className='form-label fw-bold'>Due</label>
            <input 
              type='date' 
              id='wd-due-date' 
              className='form-control mb-3'
              defaultValue={assignment.dueDate ? assignment.dueDate.split('T')[0] : '2024-05-13'}
            />
            
            <div className='row'>
              <div className='col-md-6'>
                <label htmlFor='wd-available-from' className='form-label fw-bold'>
                  Available from
                </label>
                <input
                  type='date'
                  id='wd-available-from'
                  className='form-control'
                  defaultValue={assignment.availableFrom || '2024-05-06'}
                />
              </div>
              <div className='col-md-6'>
                <label htmlFor='wd-available-until' className='form-label fw-bold'>
                  Until
                </label>
                <input
                  type='date'
                  id='wd-available-until'
                  className='form-control'
                  defaultValue={assignment.availableUntil || '2024-05-20'}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <hr className='my-4' />

      {/* Action Buttons */}
      <div className='row'>
        <div className='col-md-10 offset-md-2'>
          <Link href={`/Courses/${cid}/Assignments`} className='btn btn-secondary me-2'>
            Cancel
          </Link>
          <Link href={`/Courses/${cid}/Assignments`} className='btn btn-danger'>
            Save
          </Link>
        </div>
      </div>
    </div>
  );
}