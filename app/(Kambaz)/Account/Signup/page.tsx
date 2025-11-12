"use client";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { setCurrentUser } from "../reducer";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { FormControl, Button } from "react-bootstrap";
import * as client from "../client";

export default function Signup() {
  // initialize fields so inputs are controlled from mount
  const [user, setUser] = useState<any>({ username: '', password: '' });
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const signup = async () => {
    // basic client-side validation to avoid empty submissions
    if (!user.username || !user.password) {
      setError('Please enter a username and password');
      return;
    }
    setError('');
    setLoading(true);
    try {
  const currentUser = await client.signup(user);
  dispatch(setCurrentUser(currentUser));
  // navigate to the account profile route
  router.push('/Account/Profile');
    } catch (err: any) {
      // axios exposes response data on err.response
      const message = err?.response?.data?.message || err?.message || 'Signup failed';
      setError(String(message));
      console.error('signup error', err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="wd-signup-screen">
      <h1>Sign up</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      <FormControl
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
        className="wd-username b-2"
        placeholder="username"
      />
      <FormControl
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        className="wd-password mb-2"
        placeholder="password"
        type="password"
      />
      <button
        onClick={signup}
        className="wd-signup-btn btn btn-primary mb-2 w-100"
        disabled={loading}
      >
        {loading ? 'Signing up...' : 'Sign up'}
      </button>
      <br />
      <Link href="/Account/Signin" className="wd-signin-link">Sign in</Link>
    </div>
);}
