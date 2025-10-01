import Link from 'next/link';
import Image from 'next/image';
// Uncomment the following line if you are using react-bootstrap
import { Button, Card, CardBody, CardImg, CardText, CardTitle, Col, Row } from 'react-bootstrap';

export default function Dashboard() {
  return (
    <div id='wd-dashboard'>
      <h1 id='wd-dashboard-title'>Dashboard</h1>
      <hr />
      <h2 id='wd-dashboard-published'>Published Courses (7)</h2>
      <hr />
      <div id='wd-dashboard-courses'>
        <Row xs={1} md={5} className="g-4">
          <Col className='wd-dashboard-course' style={{ width: '300px' }}>
            <Card>
              <Link href='/Courses/1234' className='wd-dashboard-course-link text-decoration-none text-dark'>
                <CardImg
                  variant='top'
                  src='/images/reactjs.jpg'
                  width="100%"
                  height={160}
                />
                <CardBody>
                  <CardTitle className='wd-dashboard-course-title text-nowrap overflow-hidden'>CS1234 React JS</CardTitle>
                  <CardText className='wd-dashboard-course-description overflow-hidden' style={{ height: '100px' }}>
                    Full Stack Software Developer
                  </CardText>
                  <Button variant="primary">Go</Button>
                </CardBody>
              </Link>
            </Card>
          </Col>
          <Col className='wd-dashboard-course' style={{ width: '300px' }}>
            <Card>
              <Link href='/Courses/2345' className='wd-dashboard-course-link text-decoration-none text-dark'>
                <CardImg
                  variant='top'
                  src='/images/nodejs.jpg'
                  width="100%"
                  height={160}
                />
                <CardBody>
                  <CardTitle className='wd-dashboard-course-title text-nowrap overflow-hidden'>CS2345 Node JS</CardTitle>
                  <CardText className='wd-dashboard-course-description overflow-hidden' style={{ height: '100px' }}>
                    Backend Development
                  </CardText>
                  <Button variant="primary">Go</Button>
                </CardBody>
              </Link>
            </Card>
          </Col>
          <Col className='wd-dashboard-course' style={{ width: '300px' }}>
            <Card>
              <Link href='/Courses/3456' className='wd-dashboard-course-link text-decoration-none text-dark'>
                <CardImg
                  variant='top'
                  src='/images/mongodb.jpg'
                  width="100%"
                  height={160}
                />
                <CardBody>
                  <CardTitle className='wd-dashboard-course-title text-nowrap overflow-hidden'>CS3456 MongoDB</CardTitle>
                  <CardText className='wd-dashboard-course-description overflow-hidden' style={{ height: '100px' }}>
                    Database Systems
                  </CardText>
                  <Button variant="primary">Go</Button>
                </CardBody>
              </Link>
            </Card>
          </Col>
          <Col className='wd-dashboard-course' style={{ width: '300px' }}>
            <Card>
              <Link href='/Courses/4567' className='wd-dashboard-course-link text-decoration-none text-dark'>
                <CardImg
                  variant='top'
                  src='/images/python.jpg'
                  width="100%"
                  height={160}
                />
                <CardBody>
                  <CardTitle className='wd-dashboard-course-title text-nowrap overflow-hidden'>CS4567 Python</CardTitle>
                  <CardText className='wd-dashboard-course-description overflow-hidden' style={{ height: '100px' }}>
                    Programming with Python
                  </CardText>
                  <Button variant="primary">Go</Button>
                </CardBody>
              </Link>
            </Card>
          </Col>
          <Col className='wd-dashboard-course' style={{ width: '300px' }}>
            <Card>
              <Link href='/Courses/5678' className='wd-dashboard-course-link text-decoration-none text-dark'>
                <CardImg
                  variant='top'
                  src='/images/java.jpg'
                  width="100%"
                  height={160}
                />
                <CardBody>
                  <CardTitle className='wd-dashboard-course-title text-nowrap overflow-hidden'>CS5678 Java</CardTitle>
                  <CardText className='wd-dashboard-course-description overflow-hidden' style={{ height: '100px' }}>
                    Object Oriented Programming
                  </CardText>
                  <Button variant="primary">Go</Button>
                </CardBody>
              </Link>
            </Card>
          </Col>
          <Col className='wd-dashboard-course' style={{ width: '300px' }}>
            <Card>
              <Link href='/Courses/6789' className='wd-dashboard-course-link text-decoration-none text-dark'>
                <CardImg
                  variant='top'
                  src='/images/cybersecurity.jpg'
                  width="100%"
                  height={160}
                />
                <CardBody>
                  <CardTitle className='wd-dashboard-course-title text-nowrap overflow-hidden'>CS6789 Cybersecurity</CardTitle>
                  <CardText className='wd-dashboard-course-description overflow-hidden' style={{ height: '100px' }}>
                    Security Fundamentals
                  </CardText>
                  <Button variant="primary">Go</Button>
                </CardBody>
              </Link>
            </Card>
          </Col>
          <Col className='wd-dashboard-course' style={{ width: '300px' }}>
            <Card>
              <Link href='/Courses/7890' className='wd-dashboard-course-link text-decoration-none text-dark'>
                <CardImg
                  variant='top'
                  src='/images/ai.jpg'
                  width="100%"
                  height={160}
                />
                <CardBody>
                  <CardTitle className='wd-dashboard-course-title text-nowrap overflow-hidden'>CS7890 Artificial Intelligence</CardTitle>
                  <CardText className='wd-dashboard-course-description overflow-hidden' style={{ height: '100px' }}>
                    Introduction to AI
                  </CardText>
                  <Button variant="primary">Go</Button>
                </CardBody>
              </Link>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
}
