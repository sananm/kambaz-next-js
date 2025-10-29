'use client';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addAssignment, updateAssignment } from '../reducer'; // Adjust path to your reducer location

export default function AssignmentEditor() {
  const { cid, aid } = useParams<{ cid: string; aid: string }>();
  const router = useRouter();
  const dispatch = useDispatch();
  
  // Get assignments from Redux store
  const { assignments } = useSelector((state: any) => state.assignmentsReducer);
  
  // Check if this is a new assignment or editing existing
  const isNew = aid === 'new';
  
  // Find the specific assignment if editing
  const existingAssignment = assignments.find((a: any) => a._id === aid);
  
  // Form state
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    points: 100,
    dueDate: '',
    availableFrom: '',
    availableUntil: '',
    assignmentGroup: 'ASSIGNMENTS',
    displayGradeAs: 'PERCENTAGE',
    submissionType: 'ONLINE',
    assignTo: 'Everyone',
    textEntry: false,
    websiteUrl: true,
    mediaRecordings: false,
    studentAnnotation: false,
    fileUpload: false
  });

  // Initialize form data when component mounts or assignment changes
  useEffect(() => {
    if (!isNew && existingAssignment) {
      setFormData({
        title: existingAssignment.title || '',
        description: existingAssignment.description || '',
        points: existingAssignment.points || 100,
        dueDate: existingAssignment.dueDate ? existingAssignment.dueDate.split('T')[0] : '',
        availableFrom: existingAssignment.availableFrom || '',
        availableUntil: existingAssignment.availableUntil || '',
        assignmentGroup: existingAssignment.assignmentGroup || 'ASSIGNMENTS',
        displayGradeAs: existingAssignment.displayGradeAs || 'PERCENTAGE',
        submissionType: existingAssignment.submissionType || 'ONLINE',
        assignTo: existingAssignment.assignTo || 'Everyone',
        textEntry: existingAssignment.textEntry || false,
        websiteUrl: existingAssignment.websiteUrl !== undefined ? existingAssignment.websiteUrl : true,
        mediaRecordings: existingAssignment.mediaRecordings || false,
        studentAnnotation: existingAssignment.studentAnnotation || false,
        fileUpload: existingAssignment.fileUpload || false
      });
    } else if (isNew) {
      // Set default dates for new assignment
      const today = new Date();
      const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
      const twoWeeks = new Date(today.getTime() + 14 * 24 * 60 * 60 * 1000);
      
      setFormData(prev => ({
        ...prev,
        availableFrom: today.toISOString().split('T')[0],
        dueDate: nextWeek.toISOString().split('T')[0],
        availableUntil: twoWeeks.toISOString().split('T')[0]
      }));
    }
  }, [isNew, existingAssignment]);

  // Handle text input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checkbox = e.target as HTMLInputElement;
      setFormData(prev => ({
        ...prev,
        [name]: checkbox.checked
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'number' ? Number(value) : value
      }));
    }
  };

  // Handle Save
  const handleSave = () => {
    // Validation
    if (!formData.title.trim()) {
      alert('Assignment name is required');
      return;
    }

    if (!formData.dueDate) {
      alert('Due date is required');
      return;
    }

    if (formData.points < 0) {
      alert('Points must be 0 or greater');
      return;
    }

    // Prepare assignment data
    const assignmentData = {
      title: formData.title.trim(),
      description: formData.description.trim(),
      points: formData.points,
      dueDate: formData.dueDate,
      availableFrom: formData.availableFrom,
      availableUntil: formData.availableUntil,
      assignmentGroup: formData.assignmentGroup,
      displayGradeAs: formData.displayGradeAs,
      submissionType: formData.submissionType,
      assignTo: formData.assignTo,
      textEntry: formData.textEntry,
      websiteUrl: formData.websiteUrl,
      mediaRecordings: formData.mediaRecordings,
      studentAnnotation: formData.studentAnnotation,
      fileUpload: formData.fileUpload,
      course: cid,
      courseId: cid, // Include both for compatibility
      completed: existingAssignment?.completed || false
    };

    if (isNew) {
      // Create new assignment
      dispatch(addAssignment(assignmentData));
    } else {
      // Update existing assignment
      dispatch(updateAssignment({
        _id: aid,
        ...assignmentData
      }));
    }
    
    // Navigate back to assignments list
    router.push(`/Courses/${cid}/Assignments`);
  };

  // Handle Cancel
  const handleCancel = () => {
    router.push(`/Courses/${cid}/Assignments`);
  };

  // If editing and assignment not found, show error
  if (!isNew && !existingAssignment) {
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
      {/* Assignment Name */}
      <div className='row mb-3'>
        <label htmlFor='wd-name' className='col-md-2 col-form-label text-md-end'>
          Assignment Name
        </label>
        <div className='col-md-10'>
          <input 
            id='wd-name'
            name='title' 
            className='form-control' 
            value={formData.title}
            onChange={handleInputChange}
            placeholder='Enter assignment name'
            required
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
            name='description' 
            className='form-control' 
            rows={10}
            value={formData.description}
            onChange={handleInputChange}
            placeholder='The assignment is available online Submit a link to the landing page of your Web application running on Netlify. The landing page should include the following: Your full name and section Links to each of the lab assignments Link to the Kanbas application Links to all relevant source code repositories The Kanbas application should include a link to navigate back to the landing page.'
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
            name='points' 
            type='number'
            className='form-control' 
            value={formData.points}
            onChange={handleInputChange}
            min='0'
          />
        </div>
      </div>

      {/* Assignment Group */}
      <div className='row mb-3'>
        <label htmlFor='wd-group' className='col-md-2 col-form-label text-md-end'>
          Assignment Group
        </label>
        <div className='col-md-10'>
          <select 
            id='wd-group' 
            name='assignmentGroup'
            className='form-select'
            value={formData.assignmentGroup}
            onChange={handleInputChange}
          >
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
          <select 
            id='wd-display-grade-as' 
            name='displayGradeAs'
            className='form-select'
            value={formData.displayGradeAs}
            onChange={handleInputChange}
          >
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
            <select 
              id='wd-submission-type' 
              name='submissionType'
              className='form-select mb-3'
              value={formData.submissionType}
              onChange={handleInputChange}
            >
              <option value='ONLINE'>Online</option>
              <option value='ON_PAPER'>On Paper</option>
              <option value='NO_SUBMISSION'>No Submission</option>
            </select>
            
            {formData.submissionType === 'ONLINE' && (
              <div>
                <strong className='mb-3 d-block'>Online Entry Options</strong>
                <div className='form-check mb-2'>
                  <input
                    type='checkbox'
                    className='form-check-input'
                    name='textEntry'
                    id='wd-text-entry'
                    checked={formData.textEntry}
                    onChange={handleInputChange}
                  />
                  <label className='form-check-label' htmlFor='wd-text-entry'>
                    Text Entry
                  </label>
                </div>
                <div className='form-check mb-2'>
                  <input
                    type='checkbox'
                    className='form-check-input'
                    name='websiteUrl'
                    id='wd-website-url'
                    checked={formData.websiteUrl}
                    onChange={handleInputChange}
                  />
                  <label className='form-check-label' htmlFor='wd-website-url'>
                    Website URL
                  </label>
                </div>
                <div className='form-check mb-2'>
                  <input
                    type='checkbox'
                    className='form-check-input'
                    name='mediaRecordings'
                    id='wd-media-recordings'
                    checked={formData.mediaRecordings}
                    onChange={handleInputChange}
                  />
                  <label className='form-check-label' htmlFor='wd-media-recordings'>
                    Media Recordings
                  </label>
                </div>
                <div className='form-check mb-2'>
                  <input
                    type='checkbox'
                    className='form-check-input'
                    name='studentAnnotation'
                    id='wd-student-annotation'
                    checked={formData.studentAnnotation}
                    onChange={handleInputChange}
                  />
                  <label className='form-check-label' htmlFor='wd-student-annotation'>
                    Student Annotation
                  </label>
                </div>
                <div className='form-check'>
                  <input
                    type='checkbox'
                    className='form-check-input'
                    name='fileUpload'
                    id='wd-file-upload'
                    checked={formData.fileUpload}
                    onChange={handleInputChange}
                  />
                  <label className='form-check-label' htmlFor='wd-file-upload'>
                    File Uploads
                  </label>
                </div>
              </div>
            )}
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
              name='assignTo' 
              className='form-control mb-3'
              value={formData.assignTo}
              onChange={handleInputChange}
            />
            
            <label htmlFor='wd-due-date' className='form-label fw-bold'>Due</label>
            <input 
              type='date' 
              id='wd-due-date'
              name='dueDate' 
              className='form-control mb-3'
              value={formData.dueDate}
              onChange={handleInputChange}
              required
            />
            
            <div className='row'>
              <div className='col-md-6'>
                <label htmlFor='wd-available-from' className='form-label fw-bold'>
                  Available from
                </label>
                <input
                  type='date'
                  id='wd-available-from'
                  name='availableFrom'
                  className='form-control'
                  value={formData.availableFrom}
                  onChange={handleInputChange}
                />
              </div>
              <div className='col-md-6'>
                <label htmlFor='wd-available-until' className='form-label fw-bold'>
                  Until
                </label>
                <input
                  type='date'
                  id='wd-available-until'
                  name='availableUntil'
                  className='form-control'
                  value={formData.availableUntil}
                  onChange={handleInputChange}
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
          <button 
            className='btn btn-secondary me-2'
            onClick={handleCancel}
            type='button'
          >
            Cancel
          </button>
          <button 
            className='btn btn-danger'
            onClick={handleSave}
            type='button'
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}