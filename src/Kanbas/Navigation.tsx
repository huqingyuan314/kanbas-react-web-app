import "./styles.css"

import { Link, useLocation } from "react-router-dom";

import { AiOutlineDashboard } from "react-icons/ai";
import { FaRegCircleUser } from "react-icons/fa6";
import { LuCalendarDays } from "react-icons/lu";
import { HiOutlineInboxArrowDown } from "react-icons/hi2";
import { GoGear } from "react-icons/go";
import { GrBook } from "react-icons/gr";


export default function KanbasNavigation() {

   const { pathname } = useLocation();
   const links = [
     { label: "Dashboard", path: "/Kanbas/Dashboard", icon: AiOutlineDashboard },
     { label: "Courses",   path: "/Kanbas/Dashboard", icon: GrBook },
     { label: "Calendar",  path: "/Kanbas/Calendar",  icon: LuCalendarDays },
     { label: "Inbox",     path: "/Kanbas/Inbox",     icon: HiOutlineInboxArrowDown },
     { label: "Labs",      path: "/Labs",             icon: GoGear },
   ];
 

  return (

<div id="wd-kanbas-navigation" style={{ width: 110 }} 
    className="list-group rounded-0 position-fixed bottom-0 top-0 d-none d-md-block bg-black z-2">

{/* NEU Link */}
 <a id="wd-neu-link" target="_blank" 
   href="https://www.northeastern.edu/"
   className="list-group-item bg-black border-0 text-center">
   <img src="/images/NEU.png" width="75px" /></a>

{/* Other Links in array */}
   <Link to="/Kanbas/Account" className={`list-group-item text-center border-0 bg-black
            ${pathname.includes("Account") ? "bg-white text-danger" : "bg-black text-white"}`}>
        <FaRegCircleUser className={`fs-1 ${pathname.includes("Account") ? "text-danger" : "text-white"}`} />
        <br />
        Account
      </Link>

      {links.map((link) => (
        <Link key={link.path} to={link.path} className={`list-group-item bg-black text-center border-0
              ${pathname.includes(link.label) ? "text-danger bg-white" : "text-white bg-black"}`}>
          {link.icon({ className: "fs-1 text-danger"})}
          <br />
          {link.label}
        </Link>
      ))}

</div>
);}

