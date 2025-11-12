'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import * as client from "../Courses/client";
import { useDispatch, useSelector } from 'react-redux';
import { setCourses, addNewCourse, deleteCourse, updateCourse } from '../Courses/reducer';
import {
  Button,
  Card,
  CardBody,
  CardImg,
  CardText,
  CardTitle,
  Col,
  FormControl,
  Row,
} from 'react-bootstrap';

export default function Dashboard() {
  const router = useRouter();
  const { courses } = useSelector((state: any) => state.coursesReducer);
  const dispatch = useDispatch();
  const [showAllCourses, setShowAllCourses] = useState(false);
  const [enrolledCourseIds, setEnrolledCourseIds] = useState<string[]>([]);

  const [course, setCourse] = useState<any>({
    _id: '0',
    name: 'New Course',
    number: 'New Number',
    startDate: '2023-09-10',
    endDate: '2023-12-15',
    image: '/images/reactjs.jpg',
    description: 'New Description',
  });

  const fetchCourses = async () => {
    try {
      const courses = await client.findMyCourses();
      dispatch(setCourses(courses));
      // Track enrolled course IDs
      setEnrolledCourseIds(courses.map((c: any) => c._id));
    } catch (error) {
      console.error(error);
    }
  };

  const fetchAllCourses = async () => {
    try {
      // First get enrolled courses to track IDs
      const enrolledCourses = await client.findMyCourses();
      setEnrolledCourseIds(enrolledCourses.map((c: any) => c._id));

      // Then fetch all courses
      const allCourses = await client.fetchAllCourses();
      dispatch(setCourses(allCourses));
    } catch (error) {
      console.error(error);
    }
  };

  const handleEnroll = async (courseId: string) => {
    try {
      await client.enrollInCourse(courseId);
      alert('Enrolled successfully!');
      // Add to enrolled course IDs immediately
      setEnrolledCourseIds([...enrolledCourseIds, courseId]);
      // If showing all courses, re-fetch to update the list
      if (showAllCourses) {
        await fetchAllCourses();
      } else {
        await fetchCourses();
      }
    } catch (error) {
      console.error('Error enrolling:', error);
      alert('Failed to enroll in course');
    }
  };

  const isEnrolled = (courseId: string) => {
    return enrolledCourseIds.includes(courseId);
  };

  const handleUnenroll = async (courseId: string) => {
    try {
      const result = await client.unenrollFromCourse(courseId);
      console.log('Unenroll result:', result);
      alert('Unenrolled successfully!');
      // Remove from enrolled course IDs immediately
      setEnrolledCourseIds(enrolledCourseIds.filter(id => id !== courseId));
      // Re-fetch courses to get updated list from server
      if (showAllCourses) {
        // If viewing all courses, just update enrolled IDs, keep showing all courses
        const enrolledCourses = await client.findMyCourses();
        setEnrolledCourseIds(enrolledCourses.map((c: any) => c._id));
      } else {
        // If viewing published courses, refresh to remove unenrolled course
        await fetchCourses();
      }
    } catch (error) {
      console.error('Error unenrolling:', error);
      alert('Failed to unenroll from course');
    }
  };

  const addNewCourseHandler = async () => {
    try {
      console.log('Creating course:', course);
      const newCourse = await client.createCourse(course);
      console.log('Course created:', newCourse);
      dispatch(addNewCourse(newCourse));
    } catch (error) {
      console.error('Error creating course:', error);
    }
  };

  const deleteCourseHandler = async (courseId: string) => {
    try {
      await client.deleteCourse(courseId);
      dispatch(deleteCourse(courseId));
    } catch (error) {
      console.error('Error deleting course:', error);
    }
  };

  const updateCourseHandler = async () => {
    try {
      const updatedCourse = await client.updateCourse(course);
      dispatch(updateCourse(updatedCourse));
    } catch (error) {
      console.error('Error updating course:', error);
    }
  };

  useEffect(() => {
    if (showAllCourses) {
      fetchAllCourses();
    } else {
      fetchCourses();
    }
  }, [showAllCourses]);


  return (
    <div id='wd-dashboard'>
      <h1 id='wd-dashboard-title'>Dashboard</h1>
      <hr />
      <h5>
        New Course
        <button
          className='btn btn-primary float-end'
          id='wd-add-new-course-click'
          onClick={addNewCourseHandler}
        >
          {' '}
          Add{' '}
        </button>
        <button
          className='btn btn-warning float-end me-2'
          onClick={updateCourseHandler}
          id='wd-update-course-click'
        >
          Update{' '}
        </button>
      </h5>
      <br />
      <FormControl
        value={course.name}
        className='mb-2'
        onChange={(e) => setCourse({ ...course, name: e.target.value })}
      />
      <FormControl
        as='textarea'
        value={course.description}
        rows={3}
        className='mb-2'
        onChange={(e) => setCourse({ ...course, description: e.target.value })}
      />
      <hr />

      <div className='d-flex justify-content-between align-items-center'>
        <h2 id='wd-dashboard-published'>
          {showAllCourses ? 'All Courses' : 'Published Courses'} ({courses?.length ?? 0})
        </h2>
        <button
          className='btn btn-primary'
          onClick={() => setShowAllCourses(!showAllCourses)}
        >
          {showAllCourses ? 'Show My Courses' : 'Show All Courses'}
        </button>
      </div>
      <hr />
      <div id='wd-dashboard-courses'>
        <Row xs={1} md={5} className='g-4'>
          {(courses ?? []).map((c: any) => (
            <Col
              key={c._id}
              className='wd-dashboard-course'
              style={{ width: '300px' }}
            >
              <Card>
                <CardImg
                  src={c.image}
                  variant='top'
                  width='100%'
                  height={160}
                />
                <CardBody className='card-body'>
                  <CardTitle className='wd-dashboard-course-title text-nowrap overflow-hidden'>
                    {c.name}{' '}
                  </CardTitle>
                  <CardText
                    className='wd-dashboard-course-description overflow-hidden'
                    style={{ height: '100px' }}
                  >
                    {c.description}{' '}
                  </CardText>


                  {!showAllCourses && (
                    <>
                      <Button
                        variant='primary'
                        onClick={() => router.push(`/Courses/${c._id}/Home`)}
                      >
                        Go
                      </Button>

                      <button
                        onClick={(event) => {
                          event.preventDefault();
                          deleteCourseHandler(c._id);
                        }}
                        className='btn btn-danger float-end'
                        id='wd-delete-course-click'
                      >
                        Delete
                      </button>
                      <button
                        id='wd-edit-course-click'
                        onClick={(event) => {
                          event.preventDefault();
                          setCourse(c);
                        }}
                        className='btn btn-warning me-2 float-end'
                      >
                        Edit
                      </button>
                      <button
                        onClick={(event) => {
                          event.preventDefault();
                          handleUnenroll(c._id);
                        }}
                        className='btn btn-secondary float-end me-2'
                      >
                        Unenroll
                      </button>
                    </>
                  )}

                  {showAllCourses && (
                    <>
                      {isEnrolled(c._id) ? (
                        <Button variant='secondary' disabled>
                          Enrolled
                        </Button>
                      ) : (
                        <Button
                          variant='success'
                          onClick={() => handleEnroll(c._id)}
                        >
                          Enroll
                        </Button>
                      )}
                    </>
                  )}
                </CardBody>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}

