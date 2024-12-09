import DeleteDialog from "./DeleteDialog";
import GreenCheckmark from "../Modules/GreenCheckmark";
import { IoEllipsisVertical } from "react-icons/io5";
import { FaTrash } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { MdOutlinePublish, MdOutlineUnpublished } from "react-icons/md";
import { RiProhibitedLine } from "react-icons/ri";

import { useDispatch, useSelector } from "react-redux";
import { editQuiz, updateQuiz } from "./reducer";
import { useParams, useNavigate } from "react-router";
import { useEffect, useState } from "react";

import * as quizzesClient from "./client";

export default function QuizControlButtons(
  {  quiz, quizId, deleteQuiz }:
  { quiz: any; quizId: string; deleteQuiz: (quizId: string) => void; }
) {

  const quizzes = useSelector((state: any) => state.quizzesReducer.quizzes);
  const { cid } = useParams();
  const navigate = useNavigate(); // Get the navigate function
  const dispatch = useDispatch();

  const [published, setPublished] = useState({});

  const editPublish = async () => {
    if (!isFaculty) {
      return;
    }
  const newPublishedStatus = !quiz.published;
  setPublished(newPublishedStatus);
  const updatedQuiz = { ...quiz, published: newPublishedStatus };
  try {
    await quizzesClient.updateQuiz(updatedQuiz); // API call
    dispatch(updateQuiz(updatedQuiz)); // Update Redux state
  } catch (error) {
    console.error("Error updating quiz:", error);
    setPublished(!newPublishedStatus); // Revert state on failure
  }
};

  const { currentUser } = useSelector((state: any) => state.accountReducer);
  // Check if the user has FACULTY role
  const isFaculty = currentUser?.role === "FACULTY";
  

  return (
    <div className="float-end">

      {quiz.published ? <GreenCheckmark /> 
                      : <RiProhibitedLine onClick={ editPublish } className="me-2 fs-4 text-danger" /> }

  {isFaculty && (
      <div className="dropdown d-inline me-1 float-end">
        <IoEllipsisVertical className="fs-4" type="button" data-bs-toggle="dropdown" />

        <ul className="dropdown-menu">
          <li>
            <button onClick={() => navigate(`/Kanbas/Courses/${cid}/Quizzes/${quizId}`)}
            id="wd-quiz-context-menu-edit" className="dropdown-item">
              <FiEdit 
                className="me-2 fs-5 text-success" />
              Edit
            </button>
          </li>

          <li>
            <button id="wd-quiz-context-menu-delete" className="dropdown-item"
              data-bs-toggle="modal" data-bs-target="#wd-delete-quiz-dialog">
              <FaTrash className="text-danger me-2 mb-1" />
              Delete
            </button>
          </li>

          <li>
          <button 
           onClick={ editPublish }
          id="wd-quiz-context-menu-publish" className="dropdown-item">
              {quiz.published ? <RiProhibitedLine className="me-2 fs-5 text-danger" /> 
                              : <GreenCheckmark /> }
              {quiz.published ? 'Unpublish' : 'Publish'}
              </button>
          </li>

        </ul>

      </div>
      )}

      <DeleteDialog dialogTitle="Are you sure to delete the quiz?"
                    onDeleteConfirm={() => deleteQuiz(quizId)} />
    </div>
  );
}