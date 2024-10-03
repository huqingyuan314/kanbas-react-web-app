import { BsGripVertical } from "react-icons/bs";
import { RxTriangleDown } from "react-icons/rx";
import { FiEdit } from "react-icons/fi";
import AssignmentsControls from "./AssignmentsControls";
import AssignmentTypeControlButtons from "./AssignmentTypeControlButtons";
import AssignmentControlButtons from "./AssignmentControlButtons";

export default function Assignments() {
    return (
<div>
<AssignmentsControls /><br /><br /><br /><br />



<ul id="wd-modules" className="list-group rounded-0">

    <li className="wd-module list-group-item p-0 mb-5 fs-5 border-gray">
      <div className="wd-title p-3 ps-2 bg-secondary">         
        <BsGripVertical className="me-2 fs-3" />
        <RxTriangleDown className="me-2 fs-4"/>
        ASSIGNMENTS
        <AssignmentTypeControlButtons />
         </div>
      <ul className="wd-lessons list-group rounded-0">


      <li className="wd-lesson list-group-item p-3 ps-1">
        <div className="d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center">
      <BsGripVertical className="me-3 fs-3" />
      <FiEdit className="me-4 fs-5 text-success" />
      <div>
        <div><a className="wd-assignment-link text-black text-decoration-none"
              href="#/Kanbas/Courses/1234/Assignments/123">
              A1 - ENV + HTML
            </a></div>
        <div className="text-muted small">
          <span className="text-danger">Multiple Modules</span> | <b>Not available until</b> May 6 at 12:00am | <br />
          <b>Due</b> May 13 at 11:59pm | 100 pts
        </div>
      </div>
    </div>
    <div className="d-flex align-items-center">
      <AssignmentControlButtons />
    </div>
  </div>
</li>

<li className="wd-lesson list-group-item p-3 ps-1">
        <div className="d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center">
      <BsGripVertical className="me-3 fs-3" />
      <FiEdit className="me-4 fs-5 text-success" />
      <div>
        <div><a className="wd-assignment-link text-black text-decoration-none"
              href="#/Kanbas/Courses/1234/Assignments/123">
              A2 - CSS + BOOTSTRAP
            </a></div>
        <div className="text-muted small">
          <span className="text-danger">Multiple Modules</span> | <b>Not available until</b> May 13 at 12:00am | <br />
          <b>Due</b> May 20 at 11:59pm | 100 pts
        </div>
      </div>
    </div>
    <div className="d-flex align-items-center">
      <AssignmentControlButtons />
    </div>
  </div>
</li>

<li className="wd-lesson list-group-item p-3 ps-1">
        <div className="d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center">
      <BsGripVertical className="me-3 fs-3" />
      <FiEdit className="me-4 fs-5 text-success" />
      <div>
        <div><a className="wd-assignment-link text-black text-decoration-none"
              href="#/Kanbas/Courses/1234/Assignments/123">
              A3 - JAVASCRIPT + REACT
            </a></div>
        <div className="text-muted small">
          <span className="text-danger">Multiple Modules</span> | <b>Not available until</b> May 20 at 12:00am | <br />
          <b>Due</b> May 27 at 11:59pm | 100 pts
        </div>
      </div>
    </div>
    <div className="d-flex align-items-center">
      <AssignmentControlButtons />
    </div>
  </div>
</li>

      </ul>
    </li>


    <li className="wd-module list-group-item p-0 mb-5 fs-5 border-gray">
      <div className="wd-title p-3 ps-2 bg-secondary"> 
      <BsGripVertical className="me-2 fs-3" />
      <RxTriangleDown className="me-2 fs-4"/>
      PAST ASSIGNMENTS
      <AssignmentTypeControlButtons />
      </div>

      <li className="wd-lesson list-group-item p-3 ps-1">
        <div className="d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center">
      <BsGripVertical className="me-3 fs-3" />
      <FiEdit className="me-4 fs-5 text-success" />
      <div>
        <div><a className="wd-assignment-link text-black text-decoration-none"
              href="#/Kanbas/Courses/1234/Assignments/123">
              A0 - PREPARATION WORKS
            </a></div>
        <div className="text-muted small">
          <span className="text-danger">Multiple Modules</span> | <b>Closed</b> | <br />
          <b>Due</b> May 7 at 11:59pm | 100 pts
        </div>
      </div>
    </div>
    <div className="d-flex align-items-center">
      <AssignmentControlButtons />
    </div>
  </div>
</li>

    </li>
  </ul>


</div>
  );}
  