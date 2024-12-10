import { BsGripVertical } from "react-icons/bs";
import { RxTriangleDown } from "react-icons/rx";
import { FiEdit } from "react-icons/fi";
import GreenCheckmark from "../Modules/GreenCheckmark";

import QuizzesControls from "./QuizzesControls";
import QuizControlButtons from "./QuizControlButtons";

import { useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";


import {
    addQuiz, deleteQuiz, updateQuiz, editQuiz, setQuizzes
} from "./reducer";
import * as coursesClient from "../client";
import * as quizzesClient from "./client";
import { useEffect, useState } from "react";



export default function Quizzes() {

  const { cid } = useParams();
  const [quizTitle, setQuizTitle] = useState("");

  const quizzes = useSelector(
    (state: any) => state.quizzesReducer.quizzes
  );
  
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const dispatch = useDispatch();

  const fetchQuizzes = async () => {
    const quizzes = await coursesClient.findQuizzesForCourse(cid as string);
    dispatch(setQuizzes(quizzes));
  };
  useEffect(() => {
    fetchQuizzes();
  }, []);


  const removeQuiz = async (quizId: string) => {
    await quizzesClient.deleteQuiz(quizId);
    dispatch(deleteQuiz(quizId));
  };

  function dateFormat(date: Date) {
    if (!date) return '';
    const dueDate = new Date(date);
    return dueDate.toISOString().slice(0, 10);
}
  
function determineAvailability(quiz: { availableDate: Date; availableUntilDate: Date; }) {
    const currentDate = new Date();
    const availableDate = new Date(quiz.availableDate);
    const availableUntilDate = new Date(quiz.availableUntilDate);

    if (currentDate < availableDate) {
        // Current date is before the available date
        return `Not available until ${dateFormat(quiz.availableDate)}`;
    } else if (currentDate >= availableDate && currentDate <= availableUntilDate) {
        // Current date is between the available date and the available until date
        return "Available";
    } else {
        // Current date is after the available until date
        return "Closed";
    }
}

  // Check if the user has FACULTY role
  const isFaculty = currentUser?.role === "FACULTY";



  return (
    
    <div>
      <QuizzesControls />

      <br />
      <br />
      <br />
      <br />

      <ul id="wd-quizzes" className="list-group rounded-0">
        <li className="wd-module list-group-item p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary">
            {isFaculty && <BsGripVertical className="me-2 fs-3" />}
            <RxTriangleDown className="me-2 fs-4" />
            Quizzes
          </div>

          <ul className="wd-lessons list-group rounded-0">
            {quizzes
              .map((quiz: any) => (
                <li
                  key={quiz._id}
                  className="wd-lesson list-group-item p-3 ps-1"
                >
                  <div className="d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center">
                      {isFaculty && (
                        <div>
                          <BsGripVertical className="me-2 fs-3" />
                        </div>
                      )}

                      <div>
                        <a
                          className="wd-quiz-link text-black text-decoration-none"
                          href={`#/Kanbas/Courses/${cid}/Quizzes/${quiz._id}`}
                          onClick={() => editQuiz(quiz._id)}
                        >
                          {quiz.title}
                        </a>

                        <div className="text-muted small">
                          <span className="text-danger">{determineAvailability(quiz)}</span>{" "}
                         | <b>Due</b> {dateFormat(quiz.dueDate)} at{" "} 11:59pm
                          {quiz.dueTime} | -/{quiz.points} pts | {quiz.numOfQuestions} Questions
                        </div>
                      </div>
                      
                    </div>

                    <div className="d-flex align-items-center ms-auto">
                      
                        <QuizControlButtons
                          deleteQuiz={(quizId) => removeQuiz(quizId)} quizId={`${quiz._id}`} quiz={quiz}                       />
            

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
