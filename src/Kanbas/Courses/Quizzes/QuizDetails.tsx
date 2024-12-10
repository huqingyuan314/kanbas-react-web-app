import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { updateQuiz } from "./reducer";
import { FiEye } from "react-icons/fi";
import { MdOutlineEdit } from "react-icons/md";

export default function QuizDetails() {
  const { qid } = useParams(); // Get quizId from URL params
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Fetch the specific quiz from Redux store
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const quizzes = useSelector((state: any) => state.quizzesReducer.quizzes);
  const quiz = quizzes.find((quiz: any) => quiz._id === qid);

  if (!quiz) {
    return <div>Loading quiz details...</div>;
  }

  function dateFormat(date: Date) {
    if (!date) return '';
    const dueDate = new Date(date);
    return dueDate.toISOString().slice(0, 10);
}


  // Check if the user has FACULTY role
  const isFaculty = currentUser?.role === "FACULTY";



  return (
    <div>

{isFaculty && 
<div>
    <div className="mb-1 d-flex justify-content-center">
    <button id="wd-quiz-preview-btn" className="btn btn-lg btn-secondary me-4 p-2"
      onClick={ () => navigate(`QuizPreview`) }
      >
        <FiEye className="position-relative me-2" style={{ bottom: "1px" }} />
        Preview</button>

      <button onClick={ () => navigate(`QuizEditor/QuizDetailsEditor`) }
      id="wd-quiz-edit-btn" className="btn btn-lg btn-secondary me-4">
        <MdOutlineEdit className="position-relative" style={{ bottom: "1px" }} />
        Edit
      </button>
      </div>


      <hr />

      <h2>{quiz.title || "Quiz Details"}</h2>

      <div id="wd-quizzes-detail" className="container mt-4">

        <div className="row mb-1 justify-content-end">
          <div className="col-5 d-flex justify-content-end align-items-center">
            <b>Quiz Type</b>
          </div>
          <div className="col-7 d-flex justify-content-begin align-items-center">
            {quiz.quizType}
          </div>
        </div>

        <div className="row mb-1 justify-content-end">
          <div className="col-5 d-flex justify-content-end align-items-center">
            <b>Points</b>
          </div>
          <div className="col-7 d-flex justify-content-begin align-items-center">
            {quiz.points}
          </div>
        </div>

        <div className="row mb-1 justify-content-end">
          <div className="col-5 d-flex justify-content-end align-items-center">
            <b>Assignment Group</b>
          </div>
          <div className="col-7 d-flex justify-content-begin align-items-center">
            {quiz.assignmentGroup}
          </div>
        </div>

        <div className="row mb-1 justify-content-end">
          <div className="col-5 d-flex justify-content-end align-items-center">
            <b>Shuffle Answers</b>
          </div>
          <div className="col-7 d-flex justify-content-begin align-items-center">
            {quiz.shuffleAnswers && "Yes"}
            {!quiz.shuffleAnswers && "No"}
          </div>
        </div>

        <div className="row mb-1 justify-content-end">
          <div className="col-5 d-flex justify-content-end align-items-center">
            <b>Time Limit</b>
          </div>
          <div className="col-7 d-flex justify-content-begin align-items-center">
            {quiz.timeLimit} Minutes
          </div>
        </div>

        <div className="row mb-1 justify-content-end">
          <div className="col-5 d-flex justify-content-end align-items-center">
            <b>Multiple Attempts</b>
          </div>
          <div className="col-7 d-flex justify-content-begin align-items-center">
            {quiz.multipleAttempts && "Yes"}
            {!quiz.multipleAttempts && "No"}
          </div>
        </div>

        <div className="row mb-1 justify-content-end">
          <div className="col-5 d-flex justify-content-end align-items-center">
            <b>How Many Attempts</b>
          </div>
          <div className="col-7 d-flex justify-content-begin align-items-center">
            {quiz.howManyAttempts}
          </div>
        </div>

        <div className="row mb-1 justify-content-end">
          <div className="col-5 d-flex justify-content-end align-items-center">
            <b>Show Correct Answers</b>
          </div>
          <div className="col-7 d-flex justify-content-begin align-items-center">
            {quiz.showCorrectAnswers && "Yes"}
            {!quiz.showCorrectAnswers && "No"}
          </div>
        </div>

        <div className="row mb-1 justify-content-end">
          <div className="col-5 d-flex justify-content-end align-items-center">
            <b>Access Code</b>
          </div>
          <div className="col-7 d-flex justify-content-begin align-items-center">
            {quiz.accessCode}
          </div>
        </div>

        <div className="row mb-1 justify-content-end">
          <div className="col-5 d-flex justify-content-end align-items-center">
            <b>One Question at a Time</b>
          </div>
          <div className="col-7 d-flex justify-content-begin align-items-center">
            {quiz.oneQuestionAtATime && "Yes"}
            {!quiz.oneQuestionAtATime && "No"}
          </div>
        </div>

        <div className="row mb-1 justify-content-end">
          <div className="col-5 d-flex justify-content-end align-items-center">
            <b>Webcam Required</b>
          </div>
          <div className="col-7 d-flex justify-content-begin align-items-center">
            {quiz.webcamRequired && "Yes"}
            {!quiz.webcamRequired && "No"}
          </div>
        </div>

        <div className="row mb-1 justify-content-end">
          <div className="col-5 d-flex justify-content-end align-items-center">
            <b>Lock Questions After Answering</b>
          </div>
          <div className="col-7 d-flex justify-content-begin align-items-center">
            {quiz.lockQuestionsAfterAnswering && "Yes"}
            {!quiz.lockQuestionsAfterAnswering && "No"}
          </div>
        </div>

<br/>
        <div className="row mb-1 justify-content-between">
          <div className="col-2 d-flex justify-content-begin align-items-center">
            <b></b>
          </div>
          <div className="col-2 d-flex justify-content-begin align-items-center">
            <b>Due</b>
          </div>
          <div className="col-2 d-flex justify-content-begin align-items-center">
            <b>For</b>
          </div>
          <div className="col-2 d-flex justify-content-begin align-items-center">
            <b>Available From</b>
          </div>
          <div className="col-2 d-flex justify-content-begin align-items-center">
            <b>Until</b>
          </div>
          <div className="col-2 d-flex justify-content-begin align-items-center">
            <b></b>
          </div>
        </div>

        <hr />

        <div className="row mb-1 justify-content-between">
          <div className="col-2 d-flex justify-content-begin align-items-center">
            <b></b>
          </div>
          <div className="col-2 d-flex justify-content-begin align-items-center">
            {dateFormat(quiz.dueDate)}
          </div>
          <div className="col-2 d-flex justify-content-begin align-items-center">
            Everyone
          </div>
          <div className="col-2 d-flex justify-content-begin align-items-center">
            {dateFormat(quiz.availableDate)}
          </div>
          <div className="col-2 d-flex justify-content-begin align-items-center">
            {dateFormat(quiz.availableUntilDate)}
          </div>
          <div className="col-2 d-flex justify-content-begin align-items-center">
            <b></b>
          </div>
        </div>

        <hr />

      </div>
      </div>
}


{!isFaculty && 
<div>

    <div className="mb-1 d-flex justify-content-center">
    <button id="wd-quiz-preview-btn" className="btn btn-lg btn-danger me-4 p-2"
    //   onClick={ () => navigate(`QuizPreview`) }
      >
        Start Quiz</button>
    </div>

</div>
}

    </div>
  );
}
