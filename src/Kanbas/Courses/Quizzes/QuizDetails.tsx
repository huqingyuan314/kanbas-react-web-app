import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { updateQuiz } from "./reducer";
import { FiEye } from "react-icons/fi";
import { MdOutlineEdit } from "react-icons/md";
import * as userClient from "../../Account/client";
import QuizResult from "./QuizResult";

interface QuizAttempt {
  _id: string;
  quiz: string;
  user: string;
  answers: QuizAnswer[];
  score: number;
  attemptDate: Date;
  attemptNumber: number;
  isCompleted: boolean;
}
interface QuizAnswer {
  question: string;
  answerText: string[];
  correct: boolean;
}

export default function QuizDetails() {
  const { qid } = useParams(); // Get quizId from URL params
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [attempts, setAttempts] = useState<any[]>([]);
  const [quizAttempt, setQuizAttempt] = useState<QuizAttempt | null>(null);


  // Fetch the specific quiz from Redux store
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const quizzes = useSelector((state: any) => state.quizzesReducer.quizzes);
  const quiz = quizzes.find((quiz: any) => quiz._id === qid);

  let howManyAttempts = quiz?.howManyAttempts || "N/A";
  const [remainAttempts, setRemainAttempts] = useState(howManyAttempts);


  function dateFormat(date: Date) {
    if (!date) return '';
    const dueDate = new Date(date);
    return dueDate.toISOString().slice(0, 10);
}



useEffect(() => {
  const fetchAttempts = async () => {
    try {
      const response = await userClient.findAttemptsForUser(currentUser._id, qid);
      console.log("Attempts fetched:", response); // Check the structure here
      setAttempts(response);
      const latestAttempt = response.sort((a:any, b:any) => new Date(b.attemptDate).getTime() - new Date(a.attemptDate).getTime())[0];
      console.log("latestAttempt fetched:", latestAttempt); // Check the structure here
      setQuizAttempt(latestAttempt);
    } catch (error) {
      console.error("Error fetching attempts:", error);
    }
  };

  fetchAttempts();
}, [currentUser._id]);



  // Check if the user has FACULTY role
  const isFaculty = currentUser?.role === "FACULTY";

  const handleStartQuiz = () => {
    if (remainAttempts > 0) {
    const remainAttemptsNew = remainAttempts - 1;
    setRemainAttempts(remainAttemptsNew);
    navigate(`QuizPreview`)
    } else {
      alert("No remaining attempts left!");
    }
  }

  if (!quiz) {
    return <div>Loading quiz details...</div>;
  }



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
            {quiz && quiz.howManyAttempts}
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

<div className="container mt-4 justify-content-between">
    <div className="row mb-1">

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
            <b>Remain Attempts</b>
          </div>
        </div>

        <hr />

        <div className="row mb-1">
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
            {remainAttempts}
          </div>
        </div>

      <br/>
      <div className="row">
        <div className="col-12 d-flex justify-content-center">
            <button id="wd-quiz-preview-btn" className="btn btn-lg btn-danger me-4 p-2"
                onClick={() => handleStartQuiz() }
            >
                Start Quiz
            </button>
        </div>
    </div>

     </div>

    

    </div>

    <br/>
    <QuizResult />

</div>
}

    </div>
  );
}
