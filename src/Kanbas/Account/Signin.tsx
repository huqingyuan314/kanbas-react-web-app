import { Link } from "react-router-dom";

export default function Signin() {
  return (
    <div id="wd-signin-screen">
      <h1>Sign in</h1>
      <input id="wd-username"
             placeholder="username"
             className="form-control mb-2"/>
      <input id="wd-password"
             placeholder="password" type="password"
             className="form-control mb-2"/>
      <Link id="wd-signin-btn"
            to="/Kanbas/Account/Profile"
            className="btn btn-primary w-100 p-1 mb-2">
            Sign in </Link>
      <Link id="wd-signup-link" to="/Kanbas/Account/Signup" className="btn btn-secondary w-30 p-1 float-end">
      Sign up</Link>
      <span className="float-end">Don't have account? &#20;</span>
    </div>
);}
