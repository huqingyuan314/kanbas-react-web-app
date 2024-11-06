// import GreenCheckmark from "../Modules/GreenCheckmark";
// import { IoEllipsisVertical } from "react-icons/io5";
// import { FaTrash } from "react-icons/fa";


// export default function AssignmentControlButtons(
//   { assignmentId, deleteAssignment }: { assignmentId: string; deleteAssignment: (assignmentId: string) => void; } 
// ) {
//     return (
//       <div className="float-end">
//       <FaTrash className="text-danger me-2 mb-1" onClick={() => deleteAssignment(assignmentId)}/>
//       <GreenCheckmark />
//       <IoEllipsisVertical className="fs-4" />
//     </div>
//   );}
  



import { useState } from "react";
import GreenCheckmark from "../Modules/GreenCheckmark";
import { IoEllipsisVertical } from "react-icons/io5";
import { FaTrash } from "react-icons/fa";

export default function AssignmentControlButtons(
  { assignmentId, deleteAssignment }: { assignmentId: string; deleteAssignment: (assignmentId: string) => void; }
) {
  const [showDialog, setShowDialog] = useState(false); // State to control the dialog visibility

  const handleDeleteClick = () => {
    setShowDialog(true); // Show the confirmation dialog
  };

  const handleConfirmDelete = () => {
    deleteAssignment(assignmentId); // Perform the deletion
    setShowDialog(false); // Close the dialog
  };

  const handleCancelDelete = () => {
    setShowDialog(false); // Close the dialog without deletion
  };

  return (
    <div className="float-end">
      <FaTrash
        className="text-danger me-2 mb-1"
        onClick={handleDeleteClick} // Trigger the delete confirmation dialog
      />
      <GreenCheckmark />
      <IoEllipsisVertical className="fs-4" />

      {/* Confirmation Dialog */}
      {showDialog && (
        <div className="confirmation-dialog">
          <div className="dialog-content">
            <p>Are you sure you want to delete this assignment?</p>
            <div className="dialog-buttons">
              <button className="btn btn-danger" onClick={handleConfirmDelete}>Yes</button>
              <button className="btn btn-secondary" onClick={handleCancelDelete}>No</button>
            </div>
          </div>
        </div>
      )}

      {/* <style jsx>{`
        .confirmation-dialog {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background-color: white;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          z-index: 1000;
        }
        .dialog-content {
          text-align: center;
        }
        .dialog-buttons button {
          margin: 5px;
        }
      `}</style> */}
    </div>
  );
}