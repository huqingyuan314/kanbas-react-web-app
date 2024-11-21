import React, { useState } from "react";
const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;

export default function WorkingWithObjects() {
  const [assignment, setAssignment] = useState({
    id: 1,
    title: "NodeJS Assignment",
    description: "Create a NodeJS server with ExpressJS",
    due: "2021-10-10",
    completed: false,
    score: 0,
  });
  const ASSIGNMENT_API_URL = `${REMOTE_SERVER}/lab5/assignment`;

  const [module, setModule] = useState({
    id: "114",
    name: "NodeJS Module",
    description: "Learn to use a NodeJS server with ExpressJS",
    course: "Example and Implement",
  });
  const MODULE_API_URL = `${REMOTE_SERVER}/lab5/module`;

  return (
    <div id="wd-working-with-objects">
      <h3>Working With Objects</h3>

      <h4>Modifying Properties</h4>

      
      <div id="wd-update-assignment" className="d-flex flex-column gap-3">

{/* Input for Assignment Title */}
<div className="d-flex align-items-center">
  <input className="form-control w-75" id="wd-assignment-title"
    defaultValue={assignment.title} onChange={(e) =>
      setAssignment({ ...assignment, title: e.target.value })} />
  <a id="wd-update-assignment-title"
     className="btn btn-primary ms-3"
     href={`${ASSIGNMENT_API_URL}/title/${assignment.title}`}>
    Update Assignment Title
  </a>
</div>

{/* Input for Assignment Score */}
<div className="d-flex align-items-center">
  <input className="form-control w-75" id="wd-assignment-score"
    type="number"
    defaultValue={assignment.score} onChange={(e) =>
      setAssignment({ ...assignment, score: parseInt(e.target.value) || 0 })} />
  <a id="wd-update-assignment-score"
     className="btn btn-primary ms-3"
     href={`${ASSIGNMENT_API_URL}/score/${assignment.score}`}>
    Update Assignment Score
  </a>
</div>

{/* Checkbox for Assignment Completed */}
<div className="d-flex align-items-center">
  <input className="form-check-input me-2" id="wd-assignment-completed"
    type="checkbox"
    checked={assignment.completed} onChange={(e) =>
      setAssignment({ ...assignment, completed: e.target.checked })} />
  <label className="form-check-label me-3" htmlFor="wd-assignment-completed">
    Completed
  </label>
  <a id="wd-update-assignment-completed"
     className="btn btn-primary"
     href={`${ASSIGNMENT_API_URL}/completed/${assignment.completed}`}>
    Update Assignment Completed
  </a>
</div>

</div>
<br />

    <div id="wd-update-module" className="d-flex flex-column gap-3">

    <div className="d-flex align-items-center">
      <input className="form-control w-75 me-2" id="wd-module-name"
        defaultValue={module.name} onChange={(e) =>
          setModule({ ...module, name: e.target.value })}/>
                <a id="wd-update-module-name"
         className="btn btn-primary float-end me-2"
         href={`${MODULE_API_URL}/name/${module.name}`}>
        Update Module Name
      </a>
      </div>

      <div className="d-flex align-items-center">
      <input className="form-control w-75 me-2" id="wd-module-description"
        defaultValue={module.description} onChange={(e) =>
          setModule({ ...module, description: e.target.value })}/>
                <a id="wd-update-module-description"
         className="btn btn-primary float-end"
         href={`${MODULE_API_URL}/description/${module.description}`}>
        Update Module Description
      </a>
      </div>
    </div>

      <hr />

      <h4>Retrieving Objects</h4>
      <a
        id="wd-retrieve-assignments"
        className="btn btn-primary me-2"
        href={`${REMOTE_SERVER}/lab5/assignment`}
      >
        Get Assignment
      </a>
      <a
        id="wd-retrieve-module"
        className="btn btn-primary"
        href={`${REMOTE_SERVER}/lab5/module`}
      >
        Get Module
      </a>
      <hr />

      <h4>Retrieving Properties</h4>
      <a
        id="wd-retrieve-assignment-title"
        className="btn btn-primary me-2"
        href={`${REMOTE_SERVER}/lab5/assignment/title`}
      >
        Get Assignment Title
      </a>
      <a
        id="wd-retrieve-module-name"
        className="btn btn-primary"
        href={`${REMOTE_SERVER}/lab5/module/name`}
      >
        Get Module Name
      </a>
      <hr />

    </div>
  );
}
