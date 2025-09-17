import Link from 'next/link';
import Image from 'next/image';

export default function Dashboard() {
  return (
    <div id='wd-dashboard'>
      <h1 id='wd-dashboard-title'>Dashboard</h1>
      <hr />
      <h2 id='wd-dashboard-published'>Published Courses (7)</h2>
      <hr />
      <div id='wd-dashboard-courses'>
        <div className='wd-dashboard-course'>
          <Link href='/Courses/1234' className='wd-dashboard-course-link'>
            <Image
              src='/images/reactjs.jpg'
              width={200}
              height={150}
              alt='React JS'
            />
            <div>
              <h5>CS1234 React JS</h5>
              <p className='wd-dashboard-course-title'>
                Full Stack Software Developer
              </p>
              <button>Go</button>
            </div>
          </Link>
        </div>

        <div className='wd-dashboard-course'>
          <Link href='/Courses/2345' className='wd-dashboard-course-link'>
            <Image
              src='/images/nodejs.jpg'
              width={200}
              height={150}
              alt='Node JS'
            />
            <div>
              <h5>CS2345 Node JS</h5>
              <p className='wd-dashboard-course-title'>Backend Development</p>
              <button>Go</button>
            </div>
          </Link>
        </div>

        <div className='wd-dashboard-course'>
          <Link href='/Courses/3456' className='wd-dashboard-course-link'>
            <Image
              src='/images/mongodb.jpg'
              width={200}
              height={150}
              alt='MongoDB'
            />
            <div>
              <h5>CS3456 MongoDB</h5>
              <p className='wd-dashboard-course-title'>Database Systems</p>
              <button>Go</button>
            </div>
          </Link>
        </div>

        <div className='wd-dashboard-course'>
          <Link href='/Courses/4567' className='wd-dashboard-course-link'>
            <Image
              src='/images/python.jpg'
              width={200}
              height={150}
              alt='Python'
            />
            <div>
              <h5>CS4567 Python</h5>
              <p className='wd-dashboard-course-title'>
                Programming with Python
              </p>
              <button>Go</button>
            </div>
          </Link>
        </div>

        <div className='wd-dashboard-course'>
          <Link href='/Courses/5678' className='wd-dashboard-course-link'>
            <Image src='/images/java.jpg' width={200} height={150} alt='Java' />
            <div>
              <h5>CS5678 Java</h5>
              <p className='wd-dashboard-course-title'>
                Object Oriented Programming
              </p>
              <button>Go</button>
            </div>
          </Link>
        </div>

        <div className='wd-dashboard-course'>
          <Link href='/Courses/6789' className='wd-dashboard-course-link'>
            <Image
              src='/images/cybersecurity.jpg'
              width={200}
              height={150}
              alt='Cybersecurity'
            />
            <div>
              <h5>CS6789 Cybersecurity</h5>
              <p className='wd-dashboard-course-title'>Security Fundamentals</p>
              <button>Go</button>
            </div>
          </Link>
        </div>

        <div className='wd-dashboard-course'>
          <Link href='/Courses/7890' className='wd-dashboard-course-link'>
            <Image src='/images/ai.jpg' width={200} height={150} alt='AI' />
            <div>
              <h5>CS7890 Artificial Intelligence</h5>
              <p className='wd-dashboard-course-title'>Introduction to AI</p>
              <button>Go</button>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
