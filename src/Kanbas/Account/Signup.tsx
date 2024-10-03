import { Link } from "react-router-dom";

export default function Signup() {
  return (
    <div id="wd-signup-screen">
      <h3>Sign up</h3>
      <input placeholder="username" className="form-control mb-2"/>
      <input placeholder="password" type="password" className="form-control mb-2"/>
      <input placeholder="verify password" type="password" className="form-control mb-2"/>

      <Link to="/Kanbas/Account/Profile" className="btn btn-primary w-100 p-1 mb-2"> Sign up </Link>
      <Link to="/Kanbas/Account/Signin" className="btn btn-secondary w-30 p-1 float-end">Sign in</Link>
      <span className="float-end">Already have an account? &#20;</span>
    </div>


);}

