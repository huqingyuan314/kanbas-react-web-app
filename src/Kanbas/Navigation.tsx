import "./styles.css"

import { Link, NavLink, useLocation } from "react-router-dom";
import { AiOutlineDashboard } from "react-icons/ai";
import { FaRegCircleUser } from "react-icons/fa6";
import { LuCalendarDays } from "react-icons/lu";
import { HiOutlineInboxArrowDown } from "react-icons/hi2";
import { GoGear } from "react-icons/go";
import { GrBook } from "react-icons/gr";

import { useState } from 'react';


export default function KanbasNavigation() {

    const location = useLocation();  // Get current location

    // Get query params from location.search
    const searchParams = new URLSearchParams(location.search);
    const section = searchParams.get("section");  // Extract the 'section' query param

  return (

<div id="wd-kanbas-navigation" style={{ width: 110 }} 
    className="list-group rounded-0 position-fixed bottom-0 top-0 d-none d-md-block bg-black z-2">

{/* NEU Link */}
 <a id="wd-neu-link" target="_blank" 
   href="https://www.northeastern.edu/"
   className="list-group-item bg-black border-0 text-center">
   <img src="/images/NEU.png" width="75px" /></a>

{/* Account Link */}
 <NavLink to="/Kanbas/Account" id="wd-account-link"
className={({ isActive }) => 
    isActive ? "nav-link text-center border-0 active" : "nav-link text-center border-0"}>
   <FaRegCircleUser className="fs-1" /><br />
   Account </NavLink>

{/* Dashboard Link */}
 <NavLink to="/Kanbas/Dashboard?section=dashboard" id="wd-dashboard-link"
        className={
          section === "dashboard" ? "nav-link text-center border-0 active" : "nav-link text-center border-0"
        }
      >
   <AiOutlineDashboard className="fs-1 text-danger" /><br />
   Dashboard </NavLink>

{/* Courses Link */}
 <NavLink to="/Kanbas/Dashboard?section=courses" id="wd-course-link"
    className={
        section === "courses" ? "nav-link text-center border-0 active" : "nav-link text-center border-0"
      }
    >
   <GrBook className="fs-3 text-danger" /><br />
   Courses </NavLink>

{/* Calendar Link */}
   <NavLink to="/Kanbas/Calendar" id="wd-calendar-link"
className={({ isActive }) => 
    isActive ? "nav-link text-center border-0 active" : "nav-link text-center border-0"}>
   <LuCalendarDays className="fs-2 text-danger" /><br />
   Calendar </NavLink>

{/* Inbox Link */}
   <NavLink to="/Kanbas/Inbox" id="wd-inbox-link"
className={({ isActive }) => 
    isActive ? "nav-link text-center border-0 active" : "nav-link text-center border-0"}>
   <HiOutlineInboxArrowDown className="fs-2 text-danger" /><br />
   Inbox </NavLink>

{/* Labs Link */}
   <NavLink to="/Labs" id="wd-labs-link"
   className="list-group-item text-white bg-black text-center border-0">
   <GoGear className="fs-2 text-danger" /><br />
   Labs </NavLink>

 {/* complete styling the rest of the links */}


</div>


);}

