'use client';
import { redirect } from 'next/dist/client/components/navigation';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentUser } from '../reducer';
import Link from 'next/link';
import FormControl from 'react-bootstrap/FormControl';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';

export default function Profile() {
  const [profile, setProfile] = useState<any>({});
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const fetchProfile = () => {
    if (!currentUser) return redirect('/Account/Signin');
    setProfile(currentUser);
  };
  const signout = () => {
    dispatch(setCurrentUser(null));
    redirect('/Account/Signin');
  };
  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <div className='d-flex justify-content-center align-items-center min-vh-100 bg-light'>
      <div
        id='wd-profile-screen'
        className='card p-4'
        style={{ width: '400px' }}
      >
        <div className='card-body'>
          <h1 className='text-center mb-4'>Profile</h1>
          {profile && (
            <div>
              <FormControl
                defaultValue={profile.username}
                onChange={(e) =>
                  setProfile({ ...profile, username: e.target.value })
                }
                placeholder='username'
                className='wd-username mb-3'
              />

              <FormControl
                defaultValue={profile.password}
                onChange={(e) =>
                  setProfile({ ...profile, password: e.target.value })
                }
                placeholder='password'
                type='password'
                className='wd-password mb-3'
              />

              <FormControl
                defaultValue={profile.firstName}
                onChange={(e) =>
                  setProfile({ ...profile, firstName: e.target.value })
                }
                placeholder='First Name'
                id='wd-firstname'
                className='mb-3'
              />

              <FormControl
                defaultValue={profile.lastName}
                onChange={(e) =>
                  setProfile({ ...profile, lastName: e.target.value })
                }
                placeholder='Last Name'
                id='wd-lastname'
                className='mb-3'
              />

              <FormControl
                defaultValue={profile.dob}
                onChange={(e) =>
                  setProfile({ ...profile, dob: e.target.value })
                }
                type='date'
                id='wd-dob'
                className='mb-3'
              />

              <FormControl
                defaultValue={profile.email}
                onChange={(e) =>
                  setProfile({ ...profile, email: e.target.value })
                }
                type='email'
                id='wd-email'
                className='mb-3'
              />

              <Form.Select
                defaultValue='FACULTY'
                id='wd-role'
                className='mb-3'
                onChange={(e) =>
                  setProfile({ ...profile, role: e.target.value })
                }
              >
                <option value='USER'>User</option>
                <option value='ADMIN'>Admin</option>
                <option value='FACULTY'>Faculty</option>
                <option value='STUDENT'>Student</option>
              </Form.Select>

              <Button
                onClick={signout}
                className='w-100 mb-2'
                id='wd-signout-btn'
              >
                Sign out
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
