"use client";
import * as client from "../client";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { setCurrentUser } from "../reducer";
import { useRouter } from "next/navigation";

export default function Profile() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const updateProfile = async () => {
    setError("");
    setSaving(true);
    try {
      const payload = { ...currentUser, ...user };
      // ensure _id is present
      if (!payload._id && currentUser?._id) payload._id = currentUser._id;
      const updatedProfile = await client.updateUser(payload);
      dispatch(setCurrentUser(updatedProfile));
      setMessage('Profile updated');
    } catch (err: any) {
      setError(err?.response?.data?.message || err.message || 'Update failed');
      console.error('updateProfile error', err);
    } finally {
      setSaving(false);
    }
  };

  const [user, setUser] = useState<any>({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    dob: "",
    email: "",
    role: "",
  });

  useEffect(() => {
    if (currentUser) {
      setUser({
        username: currentUser.username ?? currentUser.userName ?? "",
        password: currentUser.password ?? "",
        firstName: currentUser.firstName ?? currentUser.first_name ?? "",
        lastName: currentUser.lastName ?? currentUser.last_name ?? "",
        dob: currentUser.dob ?? currentUser.dateOfBirth ?? "",
        email: currentUser.email ?? "",
        role: currentUser.role ?? "",
      });
    }
  }, [currentUser]);

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const dispatch = useDispatch();
  const router = useRouter();

  if (!currentUser) {
    return (
      <div id="wd-profile-screen" style={{ maxWidth: "400px" }}>
        <h3>Profile</h3>
        <p>You are not signed in.</p>
        <Link href="/Account/Signin">Sign in</Link>
      </div>
    );
  }

  return (
    <div id="wd-profile-screen" style={{ maxWidth: "400px" }}>
      <h3>Profile</h3>
      <div style={{ marginBottom: "15px" }}>
        <label style={{ display: "block", marginBottom: "5px" }}>Username</label>
        <input
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
          placeholder="username"
          className="wd-username form-control"
          style={{ width: "100%", padding: "10px", border: "1px solid #ccc", borderRadius: "4px" }}
        />
      </div>
      <div style={{ marginBottom: "15px" }}>
        <label style={{ display: "block", marginBottom: "5px" }}>Password</label>
        <input
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          placeholder="password"
          type="password"
          className="wd-password form-control"
          style={{ width: "100%", padding: "10px", border: "1px solid #ccc", borderRadius: "4px" }}
        />
      </div>
      <div style={{ marginBottom: "15px" }}>
        <label style={{ display: "block", marginBottom: "5px" }}>First Name</label>
        <input
          value={user.firstName}
          onChange={(e) => setUser({ ...user, firstName: e.target.value })}
          placeholder="First Name"
          id="wd-firstname"
          className="form-control"
          style={{ width: "100%", padding: "10px", border: "1px solid #ccc", borderRadius: "4px" }}
        />
      </div>
      <div style={{ marginBottom: "15px" }}>
        <label style={{ display: "block", marginBottom: "5px" }}>Last Name</label>
        <input
          value={user.lastName}
          onChange={(e) => setUser({ ...user, lastName: e.target.value })}
          placeholder="Last Name"
          id="wd-lastname"
          className="form-control"
          style={{ width: "100%", padding: "10px", border: "1px solid #ccc", borderRadius: "4px" }}
        />
      </div>
      <div style={{ marginBottom: "15px" }}>
        <label style={{ display: "block", marginBottom: "5px" }}>Date of Birth</label>
        <input
          value={user.dob}
          onChange={(e) => setUser({ ...user, dob: e.target.value })}
          type="date"
          id="wd-dob"
          className="form-control"
          style={{ width: "100%", padding: "10px", border: "1px solid #ccc", borderRadius: "4px" }}
        />
      </div>
      <div style={{ marginBottom: "15px" }}>
        <label style={{ display: "block", marginBottom: "5px" }}>Email</label>
        <input
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          type="email"
          id="wd-email"
          className="form-control"
          style={{ width: "100%", padding: "10px", border: "1px solid #ccc", borderRadius: "4px" }}
        />
      </div>
      <div style={{ marginBottom: "15px" }}>
        <label style={{ display: "block", marginBottom: "5px" }}>Role</label>
        <select
          value={user.role || ""}
          onChange={(e) => setUser({ ...user, role: e.target.value })}
          id="wd-role"
          className="form-select"
          style={{ width: "100%", padding: "10px", border: "1px solid #ccc", borderRadius: "4px" }}
        >
          <option value="USER">User</option>
          <option value="ADMIN">Admin</option>
          <option value="FACULTY">Faculty</option>
          <option value="STUDENT">Student</option>
        </select>
      </div>
      {error && <div className="alert alert-danger">{error}</div>}
      {message && <div className="alert alert-success">{message}</div>}
      <button onClick={updateProfile} className="btn btn-primary w-100 mb-2" disabled={saving}>{saving ? 'Saving...' : 'Update'}</button>
      <button onClick={() => { dispatch(setCurrentUser(null)); router.push('/Account/Signin'); }} className="btn btn-danger w-100"> Sign out </button>
      
    </div>
  );
}