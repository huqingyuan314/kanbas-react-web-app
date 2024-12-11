import { FaPlus } from "react-icons/fa6";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { IoEllipsisVertical } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import { addQuiz } from "./reducer";
import * as coursesClient from "../client";
import * as quizzesClient from "./client";
import { useState } from "react";

export default function QuizzesControls() {

  const { currentUser } = useSelector((state: any) => state.accountReducer);

  // Check if the user has FACULTY role
  const isFaculty = currentUser?.role === "FACULTY";

  const { qid, cid } = useParams();

  const location = useLocation();  // Get the current path
  const navigate = useNavigate(); // Use navigate hook
  const dispatch = useDispatch();
  
  const [quiz, setQuiz] = useState<any>({})


  const createQuiz = async () => {
    if (!cid) return;
    const newQuiz = { 
      title: `Default Quiz`, 
      course: cid 
    };
    const quiz = await coursesClient.createQuizForCourse(cid, newQuiz);
    dispatch(addQuiz(quiz));
    setQuiz(quiz);
    navigate(`${quiz._id}`);
    };


  
  return (
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
);}

