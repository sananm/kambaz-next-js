import Link from "next/link";
import FormControl from "react-bootstrap/FormControl";

export default function Signin() {
  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <div id="wd-signin-screen" className="card p-4" style={{ width: '400px' }}>
        
          <h1 className="text-center mb-4">Sign in</h1>
          
          <FormControl 
            id="wd-username"
            placeholder="Username"
            className="mb-3"
          />
          
          <FormControl 
            id="wd-password"
            placeholder="Password" 
            type="password"
            className="mb-3"
          />
          
          <Link 
            id="wd-signin-btn"
            href="/Dashboard"
            className="btn btn-primary w-100 mb-3"
          >
            Sign in
          </Link>
          
          <div className="text-center">
            <span className="text-muted">Don't have an account? </span>
            <Link id="wd-signup-link" href="/Account/Signup">
              Sign up
            </Link>
      
        </div>
      </div>
    </div>
  );
}