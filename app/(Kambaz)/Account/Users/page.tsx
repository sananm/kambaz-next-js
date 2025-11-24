"use client";
import { useState, useEffect } from "react";
import { FormControl, Form, Button, Modal } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import PeopleTable from "./PeopleTable";
import PeopleDetails from "./PeopleDetails";
import * as client from "../client";

export default function Users() {
  const [users, setUsers] = useState<any[]>([]);
  const [role, setRole] = useState("");
  const [name, setName] = useState("");
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  // New user modal state
  const [showModal, setShowModal] = useState(false);
  const [newUser, setNewUser] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    email: "",
    section: "",
    role: "STUDENT",
  });
  const [createError, setCreateError] = useState("");

  const fetchUsers = async () => {
    const usersData = await client.findAllUsers();
    setUsers(usersData);
  };

  const filterUsersByRole = async (selectedRole: string) => {
    setRole(selectedRole);
    if (selectedRole) {
      const usersData = await client.findUsersByRole(selectedRole);
      setUsers(usersData);
    } else {
      fetchUsers();
    }
  };

  const filterUsersByName = async (searchName: string) => {
    setName(searchName);
    if (searchName) {
      const usersData = await client.findUsersByPartialName(searchName);
      setUsers(usersData);
    } else {
      fetchUsers();
    }
  };

  const openCreateModal = () => {
    setNewUser({
      firstName: "",
      lastName: "",
      username: "",
      password: "",
      email: "",
      section: "",
      role: "STUDENT",
    });
    setCreateError("");
    setShowModal(true);
  };

  const createUser = async () => {
    // Validate required fields
    if (!newUser.firstName || !newUser.lastName) {
      setCreateError("First name and last name are required");
      return;
    }
    if (!newUser.username) {
      setCreateError("Username is required");
      return;
    }
    if (!newUser.password) {
      setCreateError("Temporary password is required");
      return;
    }

    try {
      const user = await client.createUser({
        ...newUser,
        lastActivity: new Date(),
      });
      setUsers([...users, user]);
      setShowModal(false);
    } catch (err: any) {
      setCreateError(err?.response?.data?.message || "Failed to create user");
    }
  };

  const handleSelectUser = (userId: string) => {
    setSelectedUserId(userId);
  };

  const handleCloseDetails = () => {
    setSelectedUserId(null);
  };

  const handleUserUpdated = () => {
    fetchUsers();
  };

  const handleUserDeleted = () => {
    setUsers(users.filter((u) => u._id !== selectedUserId));
    setSelectedUserId(null);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <h3>Users</h3>
      <Button
        onClick={openCreateModal}
        variant="danger"
        className="float-end wd-add-people"
      >
        <FaPlus className="me-2" />
        People
      </Button>

      <FormControl
        onChange={(e) => filterUsersByName(e.target.value)}
        placeholder="Search people"
        className="float-start w-25 me-2 wd-filter-by-name"
        value={name}
      />

      <Form.Select
        value={role}
        onChange={(e) => filterUsersByRole(e.target.value)}
        className="float-start w-25 wd-select-role"
      >
        <option value="">All Roles</option>
        <option value="STUDENT">Students</option>
        <option value="TA">Assistants</option>
        <option value="FACULTY">Faculty</option>
        <option value="ADMIN">Administrators</option>
      </Form.Select>

      <div className="clearfix"></div>
      <br />

      <PeopleTable users={users} onSelectUser={handleSelectUser} />

      {selectedUserId && (
        <PeopleDetails
          userId={selectedUserId}
          onClose={handleCloseDetails}
          onUserUpdated={handleUserUpdated}
          onUserDeleted={handleUserDeleted}
        />
      )}

      {/* Create User Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add New User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {createError && <div className="alert alert-danger">{createError}</div>}

          <Form.Group className="mb-3">
            <Form.Label>First Name *</Form.Label>
            <FormControl
              value={newUser.firstName}
              onChange={(e) => setNewUser({ ...newUser, firstName: e.target.value })}
              placeholder="First Name"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Last Name *</Form.Label>
            <FormControl
              value={newUser.lastName}
              onChange={(e) => setNewUser({ ...newUser, lastName: e.target.value })}
              placeholder="Last Name"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Username *</Form.Label>
            <FormControl
              value={newUser.username}
              onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
              placeholder="Username"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Temporary Password *</Form.Label>
            <FormControl
              type="password"
              value={newUser.password}
              onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
              placeholder="Temporary Password"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <FormControl
              type="email"
              value={newUser.email}
              onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
              placeholder="Email"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Section</Form.Label>
            <FormControl
              value={newUser.section}
              onChange={(e) => setNewUser({ ...newUser, section: e.target.value })}
              placeholder="Section"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Role</Form.Label>
            <Form.Select
              value={newUser.role}
              onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
            >
              <option value="STUDENT">Student</option>
              <option value="TA">Assistant</option>
              <option value="FACULTY">Faculty</option>
              <option value="ADMIN">Admin</option>
            </Form.Select>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={createUser}>
            Create User
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
