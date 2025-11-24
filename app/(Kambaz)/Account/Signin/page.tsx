"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import * as client from "../client";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentUser } from "../reducer";
import { useSession } from "../SessionContext";

export default function Signin() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { isLoading } = useSession();
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Redirect to Dashboard if already logged in
  useEffect(() => {
    if (!isLoading && currentUser) {
      router.replace("/Dashboard");
    }
  }, [isLoading, currentUser, router]);

  const handleSignin = async () => {
    setError("");
    if (!credentials.username || !credentials.password) {
      setError("Please enter username and password");
      return;
    }
    setLoading(true);
    try {
  const user = await client.signin(credentials);
  dispatch(setCurrentUser(user));
  // After signing in, send the user to the dashboard per requested behavior
  router.push('/Dashboard');
    } catch (err: any) {
      setError(err?.response?.data?.message || err.message || 'Sign in failed');
      console.error('signin error', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="wd-signin-screen" style={{ maxWidth: "400px" }}>
      <h3>Sign in</h3>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="alert alert-info" style={{ fontSize: "0.9em", padding: "8px 12px" }}>
        <strong>Demo accounts:</strong>
        <br />
        Student: iron_man / stark123
        <br />
        Admin: sanan / sanan
      </div>
      <div style={{ marginBottom: "15px" }}>
        <input
          value={credentials.username}
          onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
          placeholder="username"
          className="wd-username form-control"
          style={{
            width: "100%",
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        />
      </div>
      <div style={{ marginBottom: "15px" }}>
        <input
          value={credentials.password}
          onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
          placeholder="password"
          type="password"
          className="wd-password form-control"
          style={{
            width: "100%",
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        />
      </div>
      <button
        id="wd-signin-btn"
        onClick={handleSignin}
        disabled={loading}
        className="btn btn-danger w-100 mb-2"
      >
        {loading ? 'Signing in...' : 'Sign in'}
      </button>
      <Link
        href="/Account/Signup"
        id="wd-signup-link"
        style={{ color: "blue", textDecoration: "none" }}
      >
        Sign up
      </Link>
    </div>
  );
}