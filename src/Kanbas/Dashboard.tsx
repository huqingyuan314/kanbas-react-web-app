import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { enrollInCourse, unenrollFromCourse } from "./Enrollments/reducer";
// import * as db from "./Database";

export default function Dashboard({
  courses,
  course,
  setCourse,
  addNewCourse,
  deleteCourse,
  updateCourse,
}: {
  courses: any[];
  course: any;
  setCourse: (course: any) => void;
  addNewCourse: () => void;
  deleteCourse: (course: any) => void;
  updateCourse: () => void;
}) {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  // const { enrollments } = db;

  const enrollments = useSelector(
    (state: any) => state.enrollmentsReducer.enrollments
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showAllCourses, setShowAllCourses] = useState(false);

  // Check roles
  const isFaculty = currentUser?.role === "FACULTY";
  const isStudent = currentUser?.role === "STUDENT";

  // Toggle between all courses and enrolled courses
  const toggleCoursesView = () => setShowAllCourses(!showAllCourses);

  // Check if user is enrolled in a course
  const isEnrolled = (courseId: string) => {
    return enrollments.some(
      (enrollment: any) =>
        enrollment.user === currentUser._id && enrollment.course === courseId
    );
  };

  // Handle enrollment actions
  const handleEnrollment = (courseId: string) => {
    if (isEnrolled(courseId)) {
      dispatch(unenrollFromCourse({ user: currentUser._id, course: courseId }));
    } else {
      dispatch(enrollInCourse({ user: currentUser._id, course: courseId }));
    }
  };

  // Handle navigation based on enrollment status
  const handleNavigation = (courseId: string) => {
    if (isEnrolled(courseId)) {
      navigate(`/Kanbas/Courses/${courseId}/Home`);
    } else {
      navigate("/Kanbas/Dashboard");
    }
  };

  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1>
      <hr />

      <h5>
        {isFaculty && "New Course"}
        {isFaculty && (
          <button className="btn btn-primary float-end" onClick={addNewCourse}>
            Add
          </button>
        )}
        {isFaculty && (
          <button
            className="btn btn-warning float-end me-2"
            onClick={updateCourse}
          >
            Update
          </button>
        )}
        {isStudent && (
          <button
            className="btn btn-primary float-end"
            onClick={toggleCoursesView}
          >
            {showAllCourses ? "Show Enrolled" : "Enrollments"}
          </button>
        )}
      </h5>

      <br />
      {isFaculty && (
        <div>
          <input
            value={course.name}
            className="form-control mb-2"
            onChange={(e) => setCourse({ ...course, name: e.target.value })}
          />
          <textarea
            value={course.description}
            className="form-control"
            onChange={(e) =>
              setCourse({ ...course, description: e.target.value })
            }
          />
        </div>
      )}
      <hr />

      <h2 id="wd-dashboard-published">Published Courses ({courses.length})</h2>
      <hr />

      <div id="wd-dashboard-courses" className="row">
        <div className="row row-cols-1 row-cols-md-5 g-4">
          {(showAllCourses
            ? courses
            : courses
            // .filter((course) =>
            //     enrollments.some(
            //       (enrollment: { user: any; course: any }) =>
            //         enrollment.user === currentUser._id &&
            //         enrollment.course === course._id
            //     )
            //   )
          ).map((course) => (
            <div
              key={course._id}
              className="wd-dashboard-course col"
              style={{ width: "300px" }}
            >
              <div className="card rounded-3 overflow-hidden h-100 d-flex flex-column">
                <div
                  onClick={() => handleNavigation(course._id)}
                  style={{ cursor: "pointer" }}
                >
                  <img
                    src={`/images/RS/${course._id}.png`}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "/images/reactjs.jpg";
                    }}
                    width="100%"
                    height={160}
                  />
                </div>
                <div className="card-body d-flex flex-column">
                  <div
                    onClick={() => handleNavigation(course._id)}
                    style={{ cursor: "pointer" }}
                  >
                    <h5 className="wd-dashboard-course-title card-title text-truncate">
                      {course.name}
                    </h5>
                    <p
                      className="wd-dashboard-course-title card-text overflow-y-hidden"
                      style={{ height: 100 }}
                    >
                      {course.description}
                    </p>
                  </div>

                  <div className="">
                    <button
                      onClick={() => handleNavigation(course._id)}
                      className="btn btn-primary mt-auto"
                    >
                      Go
                    </button>

                    {isStudent && (
                      <button
                        className={`btn ${
                          isEnrolled(course._id) ? "btn-danger" : "btn-success"
                        } float-end mt-auto`}
                        onClick={() => handleEnrollment(course._id)}
                      >
                        {isEnrolled(course._id) ? "Unenroll" : "Enroll"}
                      </button>
                    )}

                    {isFaculty && (
                      <button
                        onClick={(event) => {
                          event.preventDefault();
                          deleteCourse(course._id);
                        }}
                        className="btn btn-danger float-end mt-auto"
                      >
                        Delete
                      </button>
                    )}

                    {isFaculty && (
                      <button
                        onClick={(event) => {
                          event.preventDefault();
                          setCourse(course);
                        }}
                        className="btn btn-warning float-end me-2 mt-auto"
                      >
                        Edit
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
