import Link from "next/link";
import FormControl from "react-bootstrap/FormControl";

export default function Signup() {
  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <div id="wd-signup-screen" className="card p-4" style={{ width: '400px' }}>
        <div className="card-body">
          <h1 className="text-center mb-4">Sign up</h1>
          
          <FormControl 
            placeholder="Username" 
            
            className="wd-username mb-3" 
          />
          
          <FormControl 
            placeholder="Password" 
             
            type="password" 
            className="wd-password mb-3" 
          />
          
          <FormControl
            placeholder="Verify password"
            
            type="password"
            className="wd-password-verify mb-3"
          />
          
          <Link 
            href="/Account/Profile" 
            className="btn btn-primary w-100 mb-3"
          >
            Sign up
          </Link>
          
          <div className="text-center">
            <span className="text-muted">Already have an account? </span>
            <Link href="/Account/Signin">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}