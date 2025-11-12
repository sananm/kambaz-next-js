'use client';
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useSelector } from "react-redux";
import { FaUserCircle, FaUserPlus, FaUserMinus } from "react-icons/fa";
import * as client from "../client";

export default function PeopleTable() {
  const { cid } = useParams();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const [enrolledUsers, setEnrolledUsers] = useState<any[]>([]);
  const [allUsers, setAllUsers] = useState<any[]>([]);
  const [showAllUsers, setShowAllUsers] = useState(false);

  // Check if current user can manage enrollments (not a student)
  const canManageEnrollments = currentUser && currentUser.role !== 'STUDENT';

  useEffect(() => {
    fetchEnrolledUsers();
    fetchAllUsers();
  }, [cid]);

  const fetchEnrolledUsers = async () => {
    try {
      const users = await client.findEnrolledUsers(cid as string);
      setEnrolledUsers(users);
    } catch (error) {
      console.error('Error fetching enrolled users:', error);
    }
  };

  const fetchAllUsers = async () => {
    try {
      const users = await client.findAllUsers();
      setAllUsers(users);
    } catch (error) {
      console.error('Error fetching all users:', error);
    }
  };

  const handleEnroll = async (userId: string) => {
    try {
      await client.enrollUser(cid as string, userId);
      await fetchEnrolledUsers();
    } catch (error) {
      console.error('Error enrolling user:', error);
      alert('Failed to enroll user');
    }
  };

  const handleUnenroll = async (userId: string) => {
    try {
      await client.unenrollUser(cid as string, userId);
      await fetchEnrolledUsers();
    } catch (error) {
      console.error('Error unenrolling user:', error);
      alert('Failed to unenroll user');
    }
  };

  const isUserEnrolled = (userId: string) => {
    return enrolledUsers.some((user: any) => user._id === userId);
  };

  const displayUsers = showAllUsers ? allUsers : enrolledUsers;

  return (
    <div id="wd-people-table">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>{showAllUsers ? 'All Users' : 'Enrolled Users'}</h3>
        {canManageEnrollments && (
          <button
            className="btn btn-primary"
            onClick={() => setShowAllUsers(!showAllUsers)}
          >
            {showAllUsers ? 'Show Enrolled Only' : 'Show All Users'}
          </button>
        )}
      </div>

      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Login ID</th>
            <th>Section</th>
            <th>Role</th>
            <th>Last Activity</th>
            <th>Total Activity</th>
            {canManageEnrollments && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {displayUsers.map((user: any) => {
            const enrolled = isUserEnrolled(user._id);
            return (
              <tr key={user._id}>
                <td className="wd-full-name text-nowrap">
                  <FaUserCircle className="me-2 fs-1 text-secondary" />
                  <span className="wd-first-name">{user.firstName}</span>{" "}
                  <span className="wd-last-name">{user.lastName}</span>
                </td>
                <td className="wd-login-id">{user.loginId}</td>
                <td className="wd-section">{user.section}</td>
                <td className="wd-role">{user.role}</td>
                <td className="wd-last-activity">{user.lastActivity}</td>
                <td className="wd-total-activity">{user.totalActivity}</td>
                {canManageEnrollments && (
                  <td>
                    {enrolled ? (
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleUnenroll(user._id)}
                        title="Unenroll"
                      >
                        <FaUserMinus /> Unenroll
                      </button>
                    ) : (
                      <button
                        className="btn btn-success btn-sm"
                        onClick={() => handleEnroll(user._id)}
                        title="Enroll"
                      >
                        <FaUserPlus /> Enroll
                      </button>
                    )}
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}