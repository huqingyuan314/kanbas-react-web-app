import DeleteDialog from "./DeleteDialog";

import GreenCheckmark from "../Modules/GreenCheckmark";
import { IoEllipsisVertical } from "react-icons/io5";
import { FaTrash } from "react-icons/fa";


export default function AssignmentControlButtons(
  {  deleteAssignment }:
  { deleteAssignment: () => void; }
) {
    return (
      <div className="float-end">
      <FaTrash className="text-danger me-2 mb-1" 
      data-bs-toggle="modal" data-bs-target="#wd-delete-assignment-dialog"
      />
      <GreenCheckmark />
      <IoEllipsisVertical className="fs-4" />

      <DeleteDialog dialogTitle="Are you sure to delete the assignment?"
                    deleteAssignment={deleteAssignment} />

    </div>
  );}
  

