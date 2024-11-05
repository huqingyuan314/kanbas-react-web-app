import { IoEllipsisVertical } from "react-icons/io5";
import { FaPlus } from "react-icons/fa6";
import { useSelector } from "react-redux";

export default function AssignmentTypeControlButtons() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  // Check if the user has FACULTY role
  const isFaculty = currentUser?.role === "FACULTY";
  
    return (
    <div className="float-end">
      <span className="btn btn-secondary w-30 p-1">
      40% of Total</span>

      {/* Show only if user is FACULTY */}
    {isFaculty &&
      <div className="float-end">


        
      <FaPlus className="fs-4" />
      <IoEllipsisVertical className="fs-4 " />
      </div>
    }

    </div>
  );}
  