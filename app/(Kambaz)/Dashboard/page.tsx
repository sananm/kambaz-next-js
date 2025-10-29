'use client';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import * as db from '../Database';
import { useDispatch, useSelector } from 'react-redux';
import { addNewCourse, deleteCourse, updateCourse } from '../Courses/reducer';
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
  const router = useRouter(); // ✅ Add this line
  const { courses } = useSelector((state: any) => state.coursesReducer);
  const dispatch = useDispatch();
  // const { currentUser } = useSelector((state: any) => state.accountReducer);
  // const { enrollments } = db;

  const [course, setCourse] = useState<any>({
    _id: '0',
    name: 'New Course',
    number: 'New Number',
    startDate: '2023-09-10',
    endDate: '2023-12-15',
    image: '/images/reactjs.jpg',
    description: 'New Description',
  });

  return (
    <div id='wd-dashboard'>
      <h1 id='wd-dashboard-title'>Dashboard</h1>
      <hr />
      <h5>
        New Course
        <button
          className='btn btn-primary float-end'
          id='wd-add-new-course-click'
          onClick={() => dispatch(addNewCourse(course))}
        >
          {' '}
          Add{' '}
        </button>
        <button
          className='btn btn-warning float-end me-2'
          onClick={() => dispatch(updateCourse(course))}
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

      <h2 id='wd-dashboard-published'>Published Courses ({courses.length})</h2>
      <hr />
      <div id='wd-dashboard-courses'>
        <Row xs={1} md={5} className='g-4'>
          {courses.map((c: any) => (
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

                  {/* ✅ Fixed Go Button */}
                  <Button
                    variant='primary'
                    onClick={() => router.push(`/Courses/${c._id}/Home`)}
                  >
                    Go
                  </Button>

                  <button
                    onClick={(event) => {
                      event.preventDefault();
                      dispatch(deleteCourse(c._id));
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
                </CardBody>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}