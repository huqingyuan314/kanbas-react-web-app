import { Link, NavLink } from "react-router-dom";

export default function AccountNavigation() {
  return (
    <div id="wd-account-navigation" className="wd list-group fs-5 rounded-0">

      <NavLink to="/Kanbas/Account/Signin" id="wd-account-navigation-signin"
        className={({ isActive }) => 
            isActive ? "nav-link list-group-item active border border-0" : "nav-link list-group-item text-danger border border-0"}>
          Signin </NavLink>

          <NavLink to="/Kanbas/Account/Signup" id="wd-account-navigation-signin"
        className={({ isActive }) => 
            isActive ? "nav-link list-group-item active border border-0" : "nav-link list-group-item text-danger border border-0"}>
          Signup </NavLink>

          <NavLink to="/Kanbas/Account/Profile" id="wd-account-navigation-signin"
        className={({ isActive }) => 
            isActive ? "nav-link list-group-item active border border-0" : "nav-link list-group-item text-danger border border-0"}>
          Profile </NavLink>


    </div>



);}
