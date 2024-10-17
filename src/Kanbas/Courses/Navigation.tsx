import { Link, useLocation, useParams } from "react-router-dom";
import * as db from "../Database";

export default function CoursesNavigation() {
  const links = ["Home", "Modules", "Piazza", "Zoom", "Assignments", "Quizzes", "Grades", "People"];
  const courses = db.courses;

  const { cid } = useParams();
  const { pathname } = useLocation();

    return (
      <div id="wd-courses-navigation" className="wd list-group fs-5 rounded-0">

      {links.map((link) => (
        <Link to={`/Kanbas/Courses/${cid}/${link}`} className={`
              ${pathname.includes(link) ? "list-group-item active border border-0" : "list-group-item text-danger border border-0"}`}>
          {link}
        </Link>
      ))}

      </div>
  );}
  

