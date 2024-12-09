import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
export default function Dashboard({
  courses,
  course,
  setCourse,
  addNewCourse,
  deleteCourse,
  updateCourse,
  enrolling, 
  setEnrolling,
  updateEnrollment,
}: {
  courses: any[];
  course: any;
  setCourse: (course: any) => void;
  addNewCourse: () => void;
  deleteCourse: (course: any) => void;
  updateCourse: () => void;
  enrolling: boolean; 
  setEnrolling: (enrolling: boolean) => void;
  updateEnrollment: (courseId: string, enrolled: boolean) => void
}) {

  const { currentUser } = useSelector((state: any) => state.accountReducer);
  // Check roles and protect routes
  const isFacultyOrAdmin = currentUser?.role === "FACULTY" || currentUser?.role === "ADMIN";

  const getImage = (_id: string): string => {
    const images = [
      "RS101.png",
      "RS102.png",
      "RS103.png",
      "RS104.png",
    ];
    // Convert the _id into a numeric hash
    let hash = 0;
    for (let i = 0; i < _id.length; i++) {
      hash = (hash + _id.charCodeAt(i)) % images.length; // Avoid overflow
    }
    return images[hash];
  };


  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard
      <button onClick={() => setEnrolling(!enrolling)} className="float-end btn btn-primary" >
          {enrolling ? "My Courses" : "All Courses"}
        </button>
        </h1> <hr />

    {isFacultyOrAdmin && (
       <div id="wd-dashboard-faculty">
      <h5>
        New Course
        <button
          className="btn btn-primary float-end"
          id="wd-add-new-course-click"
          onClick={addNewCourse}
        >
          Add
        </button>
        <button
          className="btn btn-warning float-end me-2"
          onClick={updateCourse}
          id="wd-update-course-click"
        >
          Update
        </button>
      </h5>
      <br />
      <input
        value={course.name}
        className="form-control mb-2"
        onChange={(e) => setCourse({ ...course, name: e.target.value })}
      />
      <textarea
        value={course.description}
        className="form-control"
        onChange={(e) => setCourse({ ...course, description: e.target.value })}
      />
      <hr />
      </div> 
    )}

      <hr />
      <h2 id="wd-dashboard-published">
        Published Courses ({courses.length})
      </h2>{" "}
      <hr />


      <div id="wd-dashboard-courses" className="row">
        <div className="row row-cols-1 row-cols-md-5 g-4">

          {courses.map((course) => (
            <div className="wd-dashboard-course col" style={{ width: "300px" }}>
              <div className="card rounded-3 overflow-hidden h-100 d-flex flex-column">
                <Link 
                  to={ `/Kanbas/Courses/${course._id}/Home` }
                  // { enrolling ? `/Kanbas/Courses/${course._id}/Home` : `/Kanbas/Dashboard` }
                  className="wd-dashboard-course-link text-decoration-none text-dark"
                >
                  {/* <img src="/images/reactjs.jpg" width="100%" /> */}
                  <img src={`/images/RS/${getImage(course._id)}`}
                    onError={(e) => {
                    (e.target as HTMLImageElement).src = "/images/reactjs.jpg"; // Fallback image
                    }}
                  width="100%" height={160} />

                  <div className="card-body ">
                    <h5 className="wd-dashboard-course-title card-title text-truncate">
                    {enrolling && (
              <button onClick={(event) => {
                event.preventDefault();
                updateEnrollment(course._id, !course.enrolled);
              }}
              className={`btn ${ course.enrolled ? "btn-danger" : "btn-success" } float-end`} >
                {course.enrolled ? "Unenroll" : "Enroll"}
              </button>
            )}
                      {course.name}
                    </h5>
                    <p
                      className="card-text card-text overflow-y-hidden"
                      style={{ maxHeight: 100 }}
                    >
                      {course.description}
                    </p>


                    <div className="">
                    <button className="btn btn-primary mt-auto"> Go </button>
                    
                    {isFacultyOrAdmin && (
                    <button
                      onClick={(event) => {
                        event.preventDefault();
                        deleteCourse(course._id);
                      }}
                      className="btn btn-danger float-end mt-auto"
                      id="wd-delete-course-click"
                    >
                      Delete
                    </button>
                    )}
                    {isFacultyOrAdmin && (
                    <button
                      id="wd-edit-course-click"
                      onClick={(event) => {
                        event.preventDefault();
                        setCourse(course);
                      }}
                      className="btn btn-warning me-2 float-end mt-auto"
                    >
                      Edit
                    </button>
                    )}
                    </div>

                  </div>
                </Link>
              </div>
            </div>
          ))}
          
        </div>
      </div>
    </div>
  );
}