import Modules from "./Modules";
import CoursesNavigation from "./Navigation";
import Home from "./Home";
import Assignments from "./Assignments";
import AssignmentEditor from "./Assignments/AssignmentEditor";
import Quizzes from "./Quizzes";
import QuizDetails from "./Quizzes/QuizDetails";
import QuizDetailsEditor from "./Quizzes/QuizDetailsEditor";
import { Navigate, Route, Routes, useParams, useLocation } from "react-router";
import { FaAlignJustify } from "react-icons/fa";
import PeopleTable from "./People/Table";
// import { users } from "../Database";
import { useEffect, useState } from "react";
import * as client from "../Courses/client";
import PeopleDetails from "./People/Details";




export default function Courses({ courses }: { courses: any[]; }) {
  const { cid } = useParams();
  const course = courses.find((course) => course._id === cid);
  const { pathname } = useLocation();

  const [users, setUsers] = useState<any[]>([]);

  const fetchUsers = async () => {
    if (!course || !course._id) return; // Ensure course is defined before calling API
    const users = await client.findUsersForCourse(course._id);
    setUsers(users);
  };

  useEffect(() => {
    fetchUsers();
  }, [course]);

    return (
      <div id="wd-courses">
        <h2 className="text-danger">
        <FaAlignJustify className="me-4 fs-4 mb-1" />
          {course && course.name} &gt; {pathname.split("/")[4]}
            </h2>
        <hr />

        <div className="d-flex">
        <div className="d-none d-md-block">
            <CoursesNavigation />
        </div>


        <div className="flex-fill">
            <Routes>
              <Route path="/" element={<Navigate to="Home" />} />
              <Route path="Home" element={<Home />} />
              <Route path="Modules" element={<Modules />} />
              <Route path="Piazza" element={<h2>Piazza</h2>} />
              <Route path="Zoom" element={<h2>Zoom</h2>} />

              <Route path="Assignments" element={<Assignments />} />
              <Route path="Assignments/:aid" element={<AssignmentEditor />} />
              <Route path="Assignments/AssignmentEditor" element={<AssignmentEditor />} />

              <Route path="Quizzes" element={<Quizzes />} />
              <Route path="Quizzes/QuizDetails" element={<QuizDetails />} />
              {/* <Route path="Quizzes/:qid" element={<QuizDetailsEditor />} /> */}
              {/* <Route path="Quizzes/QuizDetailsEditor" element={<QuizDetailsEditor />} /> */}

              <Route path="Grades" element={<h2>Grades</h2>} />
              <Route path="People/*" element={<PeopleTable users={users} />} />
              <Route path="People/:uid" element={<PeopleTable users={users} />} />
            </Routes>
            </div>
            
            </div>
      </div>
  );}
  
  