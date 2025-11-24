"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { setCurrentUser } from "../reducer";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { FormControl } from "react-bootstrap";
import * as client from "../client";
import { useSession } from "../SessionContext";

export default function Signup() {
  const [user, setUser] = useState<any>({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { isLoading } = useSession();

  // Redirect to Dashboard if already logged in
  useEffect(() => {
    if (!isLoading && currentUser) {
      router.replace("/Dashboard");
    }
  }, [isLoading, currentUser, router]);

  const signup = async () => {
    // Validate all required fields
    if (!user.firstName || !user.lastName) {
      setError("Please enter your first and last name");
      return;
    }
    if (!user.username) {
      setError("Please enter a username");
      return;
    }
    if (!user.password) {
      setError("Please enter a password");
      return;
    }
    if (user.password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setError("");
    setLoading(true);
    try {
      const currentUser = await client.signup(user);
      dispatch(setCurrentUser(currentUser));
      router.push("/Dashboard");
    } catch (err: any) {
      const message =
        err?.response?.data?.message || err?.message || "Signup failed";
      setError(String(message));
      console.error("signup error", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="wd-signup-screen" style={{ maxWidth: "400px" }}>
      <h3>Sign up</h3>
      {error && <div className="alert alert-danger">{error}</div>}

      <FormControl
        value={user.firstName}
        onChange={(e) => setUser({ ...user, firstName: e.target.value })}
        className="wd-firstname mb-2"
        placeholder="First Name *"
      />

      <FormControl
        value={user.lastName}
        onChange={(e) => setUser({ ...user, lastName: e.target.value })}
        className="wd-lastname mb-2"
        placeholder="Last Name *"
      />

      <FormControl
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
        className="wd-username mb-2"
        placeholder="Username *"
      />

      <FormControl
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        className="wd-password mb-2"
        placeholder="Password *"
        type="password"
      />

      <FormControl
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        className="wd-confirm-password mb-2"
        placeholder="Confirm Password *"
        type="password"
      />

      <button
        onClick={signup}
        className="wd-signup-btn btn btn-primary mb-2 w-100"
        disabled={loading}
      >
        {loading ? "Signing up..." : "Sign up"}
      </button>
      <br />
      <Link href="/Account/Signin" className="wd-signin-link">
        Sign in
      </Link>
    </div>
  );
}
