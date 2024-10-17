import { Link, useLocation } from "react-router-dom";

export default function AccountNavigation() {
  const links = ["Signin", "Signup", "Profile"];
  const { pathname } = useLocation();

  return (
    <div id="wd-account-navigation" className="wd list-group fs-5 rounded-0">

    {links.map((link) => (
        <Link to={`/Kanbas/Account/${link}`} className={`
              ${pathname.includes(link) ? "list-group-item active border border-0" : "list-group-item text-danger border border-0"}`}>
          {link}
        </Link>
      ))}

    </div>
);}
