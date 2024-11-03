import { FaPlus } from "react-icons/fa6";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { useSelector } from "react-redux";

export default function AssignmentsControls() {

  const { currentUser } = useSelector((state: any) => state.accountReducer);

  // Check if the user has FACULTY role
  const isFaculty = currentUser?.role === "FACULTY";

  
  return (
    <div id="wd-assignments-controls" className="d-flex justify-content-end align-items-center text-nowrap">

 <div className="input-group me-5">
  <span className="input-group-text" id="basic-addon1">
    <HiMagnifyingGlass />
  </span>
  <input id="wd-search-assignment"
         placeholder="Search..."
         className="form-control p-2"
         aria-describedby="basic-addon1" />
  </div> 
             
    {/* Show CourseStatusFac only if user is FACULTY */}
    {isFaculty &&
    <div>
<button id="wd-add-group-btn" className="btn btn-lg btn-secondary me-2">
        <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
        Group</button>

      <button id="wd-add-assignment-btn" className="btn btn-lg btn-danger me-2 p-2">
        <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
        Assignment</button>
        </div>
}




    </div>
);}

