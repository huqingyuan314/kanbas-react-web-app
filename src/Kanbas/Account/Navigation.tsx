import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

export default function AccountNavigation() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const links = currentUser ? ["Profile"] : ["Signin", "Signup"];
  const active = (path: string) => (pathname.includes(path) ? "active" : "");
  const { pathname } = useLocation();

  return (
    <div id="wd-account-navigation" className="wd list-group fs-5 rounded-0">

    {links.map((link) => (
        <Link to={`/Kanbas/Account/${link}`} className={`
              ${pathname.includes(link) ? "list-group-item active border border-0" : "list-group-item text-danger border border-0"}`}>
          {link}
        </Link>
      ))}

     {currentUser && currentUser.role === "ADMIN" && (
       <Link to={`/Kanbas/Account/Users`} className={`
        ${pathname.includes("Users") ? "list-group-item active border border-0" : "list-group-item text-danger border border-0"}`}> Users </Link> )}

    </div>
);}
