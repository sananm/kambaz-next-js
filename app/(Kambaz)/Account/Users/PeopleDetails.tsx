"use client";
import { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { FaPencil, FaCheck } from "react-icons/fa6";
import { IoCloseSharp } from "react-icons/io5";
import { FormControl, Button, Form } from "react-bootstrap";
import * as client from "../client";

export default function PeopleDetails({
  userId,
  onClose,
  onUserUpdated,
  onUserDeleted,
}: {
  userId: string | null;
  onClose: () => void;
  onUserUpdated: () => void;
  onUserDeleted: () => void;
}) {
  const [user, setUser] = useState<any>(null);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [editing, setEditing] = useState(false);

  const fetchUser = async () => {
    if (!userId) return;
    const userData = await client.findUserById(userId);
    setUser(userData);
    setName(`${userData.firstName} ${userData.lastName}`);
    setRole(userData.role || "STUDENT");
  };

  useEffect(() => {
    if (userId) {
      fetchUser();
      setEditing(false);
    }
  }, [userId]);

  const saveUser = async () => {
    const [firstName, ...lastNameParts] = name.split(" ");
    const lastName = lastNameParts.join(" ") || "";
    const updatedUser = { ...user, firstName, lastName, role };
    await client.updateUser(updatedUser);
    setUser(updatedUser);
    setEditing(false);
    onUserUpdated();
  };

  const deleteUser = async () => {
    if (!userId) return;
    await client.deleteUser(userId);
    onUserDeleted();
    onClose();
  };

  if (!userId || !user) return null;

  return (
    <div className="wd-people-details position-fixed top-0 end-0 bottom-0 bg-white p-4 shadow w-25" style={{ zIndex: 1000 }}>
      <button
        onClick={onClose}
        className="btn position-fixed end-0 top-0 wd-close-details"
      >
        <IoCloseSharp className="fs-1" />
      </button>
      <div className="text-center mt-2">
        <FaUserCircle className="text-secondary me-2 fs-1" />
      </div>
      <hr />
      <div className="text-danger fs-4 wd-name">
        {!editing && (
          <FaPencil
            onClick={() => setEditing(true)}
            className="float-end fs-5 mt-2 wd-edit"
            style={{ cursor: "pointer" }}
          />
        )}
        {editing && (
          <FaCheck
            onClick={saveUser}
            className="float-end fs-5 mt-2 me-2 wd-save"
            style={{ cursor: "pointer" }}
          />
        )}
        {!editing && (
          <div
            className="wd-name"
            onClick={() => setEditing(true)}
            style={{ cursor: "pointer" }}
          >
            {user.firstName} {user.lastName}
          </div>
        )}
        {editing && (
          <FormControl
            className="w-75 wd-edit-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                saveUser();
              }
            }}
          />
        )}
      </div>
      <b>Role:</b>{" "}
      {!editing && <span className="wd-roles">{user.role}</span>}
      {editing && (
        <Form.Select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="wd-edit-role mt-1 mb-2"
          size="sm"
        >
          <option value="STUDENT">Student</option>
          <option value="TA">Assistant</option>
          <option value="FACULTY">Faculty</option>
          <option value="ADMIN">Admin</option>
        </Form.Select>
      )}
      <br />
      <b>Login ID:</b> <span className="wd-login-id">{user.loginId}</span> <br />
      <b>Section:</b> <span className="wd-section">{user.section}</span> <br />
      <b>Total Activity:</b>{" "}
      <span className="wd-total-activity">{user.totalActivity}</span>
      <hr />
      <Button
        onClick={deleteUser}
        variant="danger"
        className="float-end wd-delete"
      >
        Delete
      </Button>
      <Button
        onClick={onClose}
        variant="secondary"
        className="float-end me-2 wd-cancel"
      >
        Cancel
      </Button>
    </div>
  );
}
