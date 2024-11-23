import { BsGripVertical } from "react-icons/bs";
import { RxTriangleDown } from "react-icons/rx";
import { FiEdit } from "react-icons/fi";
import AssignmentsControls from "./AssignmentsControls";
import AssignmentTypeControlButtons from "./AssignmentTypeControlButtons";
import AssignmentControlButtons from "./AssignmentControlButtons";
import { useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import * as db from "../../Database";
import GreenCheckmark from "../Modules/GreenCheckmark";
import {
  addAssignment,
  deleteAssignment,
  updateAssignment,
  editAssignment,
  setAssignments
} from "./reducer";
import * as coursesClient from "../client";
import * as assignmentsClient from "./client";
import { useEffect, useState } from "react";

export default function Assignments() {
  const { cid } = useParams();
  const [assignmentName, setAssignmentName] = useState("");

  // const assignments = db.assignments;
  const assignments = useSelector(
    (state: any) => state.assignmentsReducer.assignments
  );
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const dispatch = useDispatch();

  const fetchAssignments = async () => {
    const assignments = await coursesClient.findAssignmentsForCourse(cid as string);
    dispatch(setAssignments(assignments));
  };
  useEffect(() => {
    fetchAssignments();
  }, []);


  const removeAssignment = async (assignmentId: string) => {
    await assignmentsClient.deleteAssignment(assignmentId);
    dispatch(deleteAssignment(assignmentId));
  };




  // Check if the user has FACULTY role
  const isFaculty = currentUser?.role === "FACULTY";

  return (
    <div>
      <AssignmentsControls />

      <br />
      <br />
      <br />
      <br />

      <ul id="wd-assignments" className="list-group rounded-0">
        <li className="wd-module list-group-item p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary">
            {isFaculty && <BsGripVertical className="me-2 fs-3" />}
            <RxTriangleDown className="me-2 fs-4" />
            ASSIGNMENTS
            <AssignmentTypeControlButtons />
          </div>

          <ul className="wd-lessons list-group rounded-0">
            {assignments
              // .filter((assignment: any) => assignment.course === cid)
              .map((assignment: any) => (
                <li
                  key={assignment._id}
                  className="wd-lesson list-group-item p-3 ps-1"
                >
                  <div className="d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center">
                      {isFaculty && (
                        <div>
                          <BsGripVertical className="me-2 fs-3" />
                          <FiEdit className="me-4 fs-5 text-success" />
                        </div>
                      )}

                      <div>
                        <a
                          className="wd-assignment-link text-black text-decoration-none"
                          href={`#/Kanbas/Courses/${cid}/Assignments/${assignment._id}`}
                          onClick={() => editAssignment(assignment._id)}
                        >
                          {assignment.title}
                        </a>

                        <div className="text-muted small">
                          <span className="text-danger">Multiple Modules</span>{" "}
                          | <b>Not available until</b>{" "}
                          {assignment.availableDate} at{" "}
                          {assignment.availableTime} | <br />
                          <b>Due</b> {assignment.dueDate} at{" "}
                          {assignment.dueTime} | {assignment.points} pts
                        </div>
                      </div>
                    </div>

                    <div className="d-flex align-items-center ms-auto">
                      {/* Show AssignmentControlButtons only if user is FACULTY */}
                      {isFaculty && (
                        <AssignmentControlButtons
                          deleteAssignment={(assignmentId) => removeAssignment(assignmentId)} assignmentId={`${assignment._id}`}                        />
                      )}

                      {/* If user is not FACULTY, only show GreenCheckmark */}
                      {!isFaculty && (
                        <div className="float-end">
                          <GreenCheckmark />
                        </div>
                      )}
                    </div>
                  </div>
                </li>
              ))}
          </ul>
        </li>
      </ul>
    </div>
  );
}
