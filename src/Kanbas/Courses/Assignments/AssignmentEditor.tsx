import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams, useNavigate } from "react-router";
// import * as db from "../../Database";
import { Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';

import { addAssignment, deleteAssignment, updateAssignment, editAssignment } from "./reducer";
import * as coursesClient from "../client";
import * as assignmentsClient from "./client";


export default function AssignmentEditor() {
  const { aid, cid } = useParams();

  const location = useLocation();  // Get the current path
  const navigate = useNavigate(); // Use navigate hook
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [points, setPoints] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [availableDate, setAvailableDate] = useState("");
  const [availableUntilDate, setAvailableUntilDate] = useState("");

  // const assignments = db.assignments;
  const assignments = useSelector((state: any) => state.assignmentsReducer.assignments);
  const assignment = assignments.find((assignment: any) => assignment._id === aid);

  useEffect(() => {
    if (assignment) {
      setTitle(assignment.title);
      setDescription(assignment.description);
      setPoints(assignment.points);
      // setDueDate(assignment.dueDate);
      // setAvailableDate(assignment.availableDate);
      // setAvailableUntilDate(assignment.availableUntilDate);
      setDueDate(assignment.dueDate ? assignment.dueDate.split("T")[0] : ""); // Format to YYYY-MM-DD
      setAvailableDate(assignment.availableDate ? assignment.availableDate.split("T")[0] : "");
      setAvailableUntilDate(assignment.availableUntilDate ? assignment.availableUntilDate.split("T")[0] : "");
    }
  }, [assignment]);  // Dependencies array includes assignment to run effect when it changes


  // Save button handler
  const createAssignment = async () => {
    if (!cid) return;
    const newAssignment = { 
      title: title, 
      description: description, 
      points: points,
      dueDate: dueDate,
      availableDate: availableDate,
      availableUntilDate: availableUntilDate,
      course: cid 
    };
    const assignment = await coursesClient.createAssignmentForCourse(cid, newAssignment);
    dispatch(addAssignment(assignment));
    navigate(`/Kanbas/Courses/${cid}/Assignments`);
    };

    const editAndUpdateAssignment = async (updatedAssignment: any) => {
      try {
        await assignmentsClient.updateAssignment(updatedAssignment); // API call
        dispatch(updateAssignment(updatedAssignment)); // Update Redux state
        navigate(`/Kanbas/Courses/${cid}/Assignments`); // Navigate back to assignments
      } catch (error) {
        console.error("Error updating assignment:", error);
      }
    };
  
  const { currentUser } = useSelector((state: any) => state.accountReducer);
    // Check if the user has FACULTY role
    const isFaculty = currentUser?.role === "FACULTY";



    return (
      <div id="wd-assignments-editor" className="container mt-4">

        <div className="row mb-4">
          <div className="col">
            <h3>Assignment Name</h3>
            <input id="wd-name" defaultValue={assignment && assignment.title} 
            onChange={(e) => setTitle(e.target.value)}
            className="form-control" 
            readOnly={!isFaculty} />
          </div>
        </div>

        <div className="row mb-4">
          <div className="col">
            <textarea id="wd-description" defaultValue={assignment && assignment.description} 
            onChange={(e) => setDescription(e.target.value)}
            className="form-control" rows={10}
            readOnly={!isFaculty} >
            </textarea>
          </div>
        </div>



        <div className="row mb-4 justify-content-end">
          <div className="col-4 d-flex justify-content-end align-items-center">
            <label htmlFor="wd-points">Points</label>
          </div>
          <div className="col-8 d-flex justify-content-end align-items-center">
            <input id="wd-points" defaultValue={assignment && assignment.points} 
            onChange={(e) => setPoints(e.target.value)}
            className="form-control" 
            readOnly={!isFaculty} />
          </div>
          </div>



          <div className="row mb-4 justify-content-end">
          <div className="col-4 d-flex justify-content-end align-items-center">
            <label htmlFor="wd-group">Assignment Group</label>
          </div>
          <div className="col-8 d-flex justify-content-end align-items-center">
            <select id="wd-group" className="form-control"
            disabled={!isFaculty} >
              <option value="ASSIGNMENTS" selected>ASSIGNMENTS</option>
              <option value="QUIZZES">QUIZZES</option>
              <option value="EXAMS">EXAMS</option>
              <option value="PROJECT">PROJECT</option>
            </select>
          </div>
        </div>

        <div className="row mb-4 justify-content-end">
          <div className="col-4 d-flex justify-content-end align-items-center">
            <label htmlFor="wd-display-grade-as">Display Grade as</label>
          </div>
          <div className="col-8 d-flex justify-content-end align-items-center">
            <select id="wd-display-grade-as" className="form-control"
            disabled={!isFaculty} >
              <option value="PERCENTAGE" selected>Percentage</option>
              <option value="SCORE">Score</option>
              <option value="LETTER">Letter Grade</option>
              <option value="PASS">Pass / Not Pass</option>
            </select>
          </div>
          </div>



  {/* Submission Type */}
<div className="row mb-4 align-items-top">

  <div className="col-4 text-end">
    <label htmlFor="wd-submission-type" className="col-form-label">Submission Type</label>
  </div>

  <div className="col-8 border rounded p-3">
  <div className="col">
    <select id="wd-submission-type" className="form-control"
    disabled={!isFaculty} >
      <option value="ONLINE" selected>Online</option>
      <option value="ON PAPER">On Paper</option>
      <option value="EXTERNAL TOOL">External Tool</option>
      <option value="NO SUBMISSION">No Submission</option>
    </select>
  </div>


  {/* Online Entry Options */}
  <div className="col-4 text-end">
  </div>
  <div className="col-8">
  <label htmlFor="wd-online-entry-options" className="col-form-label"><b>Online Entry Options</b></label>
    <div className="form-check">
      <input className="form-check-input" type="checkbox" id="wd-text-entry" disabled={!isFaculty} />
      <label className="form-check-label" htmlFor="wd-text-entry">Text Entry</label><br />
      
      <input className="form-check-input" type="checkbox" id="wd-website-url" disabled={!isFaculty} />
      <label className="form-check-label" htmlFor="wd-website-url">Website URL</label><br />
      
      <input className="form-check-input" type="checkbox" id="wd-media-recordings" disabled={!isFaculty} />
      <label className="form-check-label" htmlFor="wd-media-recordings">Media Recordings</label><br />
      
      <input className="form-check-input" type="checkbox" id="wd-student-annotation" disabled={!isFaculty} />
      <label className="form-check-label" htmlFor="wd-student-annotation">Student Annotation</label><br />
      
      <input className="form-check-input" type="checkbox" id="wd-file-upload" disabled={!isFaculty} />
      <label className="form-check-label" htmlFor="wd-file-upload">File Uploads</label>
    </div>
  </div>
  </div>

</div>



{/* Assign */}
<div className="row mb-4 align-items-top">
  <div className="col-4 text-end">
    <label htmlFor="wd-assign" className="col-form-label">Assign</label>
  </div>

  <div className="col-8 border rounded p-3">

  <label htmlFor="wd-assign-to" className="col-form-label"><b>Assign to</b></label>
    <input id="wd-assign-to" defaultValue="Everyone" className="form-control" 
    readOnly={!isFaculty} />

    <label htmlFor="wd-due-date" className="col-form-label">Due</label>
    <input type="date" id="wd-due-date" value={dueDate} 
            onChange={(e) => setDueDate(e.target.value)}
            className="form-control" 
    readOnly={!isFaculty} />


    <div className="row">
      <div className="col">
        <label htmlFor="wd-available-from" className="col-form-label">Available from</label>
        <input type="date" id="wd-available-from" value={availableDate} 
        onChange={(e) => setAvailableDate(e.target.value)}
        className="form-control" 
        readOnly={!isFaculty} />
      </div>

      <div className="col">
        <label htmlFor="wd-available-until" className="col-form-label">Until</label>
        <input type="date" id="wd-available-until" value={availableUntilDate}
                onChange={(e) => setAvailableUntilDate(e.target.value)}
                className="form-control" 
        readOnly={!isFaculty} />
      </div>
    </div>
  </div>
</div>



<hr />

        <div className="float-end">

        <Link id="wd-cancel-btn"
            to={`/Kanbas/Courses/${cid}/Assignments`}
            className="btn btn-lg btn-secondary me-2">
            Cancel </Link>

            {isFaculty && (
          <button
          id="wd-save-btn"
          type="button"
          onClick={() =>
            location.pathname.includes("AssignmentEditor")
              ? createAssignment()
              : editAndUpdateAssignment({
                  _id: assignment._id,
                  title,
                  description,
                  points,
                  dueDate,
                  availableDate,
                  availableUntilDate,
                })
          }
          className="btn btn-lg btn-danger"
        >
          Save
        </button>
             )}

        </div>
      </div>
    );
}
