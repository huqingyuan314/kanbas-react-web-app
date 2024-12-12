import { BsGripVertical } from "react-icons/bs";
import { RxTriangleDown } from "react-icons/rx";
import { FiEdit } from "react-icons/fi";
import GreenCheckmark from "../Modules/GreenCheckmark";

// import QuizzesControls from "./QuizzesControls";
import QuizControlButtons from "./QuizControlButtons";

import { useNavigate, useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";


import {
    addQuiz, deleteQuiz, updateQuiz, editQuiz, setQuizzes
} from "./reducer";
import * as coursesClient from "../client";
import * as quizzesClient from "./client";
import { useEffect, useState } from "react";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { FaPlus } from "react-icons/fa";
import { IoEllipsisVertical } from "react-icons/io5";
import { wait } from "@testing-library/user-event/dist/utils";



export default function Quizzes() {

  const { cid } = useParams();
  const navigate = useNavigate();
  
  const [quizTitle, setQuizTitle] = useState("");

  const quizzes = useSelector(
    (state: any) => state.quizzesReducer.quizzes
  );
  
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const dispatch = useDispatch();

  const fetchQuizzes = async () => {
    console.log(`Fetching quizzes for course ID: ${cid}`);
    const quizzes = await coursesClient.findQuizzesForCourse(cid as string);
    console.log('Quizzes fetched:', quizzes);
    dispatch(setQuizzes(quizzes));
  };
  useEffect(() => {
    fetchQuizzes();
  }, [cid]);


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


  const [quiz, setQuiz] = useState<any>({})


  const createQuiz = async () => {
    if (!cid) return;
    const newQuiz = { 
      title: `Default Quiz`, 
      course: cid 
    };
    const quiz = await coursesClient.createQuizForCourse(cid, newQuiz);
    dispatch(addQuiz(quiz));
    navigate(`${quiz._id}`);
    wait(50);
    navigate(-1);
    };



  return (
    
    <div>

      <div id="wd-quizzes-controls" className="d-flex justify-content-end align-items-center text-nowrap">

<div className="input-group me-5">
 <span className="input-group-text" id="basic-addon1">
   <HiMagnifyingGlass />
 </span>
 <input id="wd-search-quiz"
        placeholder="Search for Quiz"
        className="form-control p-2"
        aria-describedby="basic-addon1" />
 </div> 
            
            
   {/* Show only if user is FACULTY */}
   {isFaculty &&
   <div>

     <button id="wd-add-quiz-btn" className="btn btn-lg btn-danger me-2 p-2"
     onClick={createQuiz}>
       <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
       Quiz</button>

     <button id="wd-add-group-btn" className="btn btn-lg btn-secondary me-2">
       <IoEllipsisVertical className="position-relative" style={{ bottom: "1px" }} />
     </button>

     </div>
}


   </div>




      <br />
      <br />
      <br />
      <br />

      <ul id="wd-quizzes-total" className="list-group rounded-0">
        <li className="wd-module list-group-item p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary">
            {isFaculty && <BsGripVertical className="me-2 fs-3" />}
            <RxTriangleDown className="me-2 fs-4" />
            Quizzes
          </div>

          <ul className="wd-quizzes list-group rounded-0">
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
                          deleteQuiz={(quizId) => removeQuiz(quizId)} quizId={`${quiz._id}`} quiz={quiz}  />
            

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
