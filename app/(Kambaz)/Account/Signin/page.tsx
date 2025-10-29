'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { setCurrentUser } from '../reducer';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import * as db from '../../Database';
import { FormControl, Button } from 'react-bootstrap';

export default function Signin() {
  const [credentials, setCredentials] = useState<any>({});
  const dispatch = useDispatch();
  const router = useRouter();
  const signin = () => {
    const user = db.users.users.find(
      (u: any) =>
        u.username === credentials.username &&
        u.password === credentials.password,
    );
    if (!user) return;
    dispatch(setCurrentUser(user));
    router.push('/Dashboard');
  };

  return (
    <div className='d-flex justify-content-center align-items-center min-vh-100 bg-light'>
      <div
        id='wd-signin-screen'
        className='card p-4'
        style={{ width: '400px' }}
      >
        <h1 className='text-center mb-4'>Sign in</h1>

        <FormControl
          defaultValue={credentials.username}
          onChange={(e) =>
            setCredentials({ ...credentials, username: e.target.value })
          }
          id='wd-username'
          placeholder='Username'
          className='mb-3'
        />

        <FormControl
          defaultValue={credentials.password}
          onChange={(e) =>
            setCredentials({ ...credentials, password: e.target.value })
          }
          id='wd-password'
          placeholder='Password'
          type='password'
          className='mb-3'
        />

        <Button onClick={signin} id='wd-signin-btn' className='w-100'>
          {' '}
          Sign in{' '}
        </Button>

        <div className='text-center'>
          <span className='text-muted'>Don't have an account? </span>
          <Link id='wd-signup-link' href='/Account/Signup'>
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}
