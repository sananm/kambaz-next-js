import Link from "next/link";
import FormControl from "react-bootstrap/FormControl";
import Form from "react-bootstrap/Form";

export default function Profile() {
  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <div id="wd-profile-screen" className="card p-4" style={{ width: '400px' }}>
        <div className="card-body">
          <h1 className="text-center mb-4">Profile</h1>
          
          <FormControl 
            defaultValue="sanan" 
            placeholder="username" 
            className="wd-username mb-3"
          />
          
          <FormControl 
            defaultValue="123" 
            placeholder="password" 
            type="password"
            className="wd-password mb-3" 
          />
          
          <FormControl 
            defaultValue="Sanan" 
            placeholder="First Name" 
            id="wd-firstname"
            className="mb-3" 
          />
          
          <FormControl 
            defaultValue="Moinuddin" 
            placeholder="Last Name" 
            id="wd-lastname"
            className="mb-3" 
          />
          
          <FormControl 
            defaultValue="2002-07-26" 
            type="date" 
            id="wd-dob"
            className="mb-3" 
          />
          
          <FormControl 
            defaultValue="sanan@moin" 
            type="email" 
            id="wd-email"
            className="mb-3" 
          />
          
          <Form.Select 
            defaultValue="FACULTY" 
            id="wd-role"
            className="mb-3"
          >
            <option value="USER">User</option>
            <option value="ADMIN">Admin</option>
            <option value="FACULTY">Faculty</option>
            <option value="STUDENT">Student</option>
          </Form.Select>
          
          <Link 
            href="/Account/Signin" 
            className="btn btn-danger w-100"
          >
            Sign out
          </Link>
        </div>
      </div>
    </div>
  );
}