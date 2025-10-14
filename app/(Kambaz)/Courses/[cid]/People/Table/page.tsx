'use client';
import React from "react";
import { useParams } from "next/navigation";
import { users as db_users, enrollments as db_enrollments } from "../../../../Database";

export default function PeopleTable() {
  const { cid } = useParams();
  
  // Get users and enrollments from database
  const users = db_users.users || db_users;
  const enrollments = db_enrollments;
  
  // Filter users based on enrollment in current course
  const enrolledUsers = users.filter((user: any) =>
    enrollments.some((enrollment: any) => 
      enrollment.user === user._id && enrollment.course === cid
    )
  );

  return (
    <div id="wd-people-table">
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Login ID</th>
            <th>Section</th>
            <th>Role</th>
            <th>Last Activity</th>
            <th>Total Activity</th>
          </tr>
        </thead>
        <tbody>
          {enrolledUsers.map((user: any) => (
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Import the icon
import { FaUserCircle } from "react-icons/fa";