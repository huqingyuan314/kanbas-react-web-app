import 'bootstrap/dist/css/bootstrap.min.css';
import SimpleWysiwyg from 'react-simple-wysiwyg';
import { useParams, useNavigate } from "react-router";

import { Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';

import { addQuiz, updateQuiz, editQuiz } from "./reducer";
import * as coursesClient from "../client";
import * as quizzesClient from "./client";


export default function QuizDetailsEditor() {
  const { qid, cid } = useParams();

  const location = useLocation();  // Get the current path
  const navigate = useNavigate(); // Use navigate hook
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  
  const [quizType, setQuizType] = useState("");
  const [points, setPoints] = useState("");
  const [assignmentGroup, setAssignmentGroup] = useState("");
  const [shuffleAnswers, setShuffleAnswers] = useState<any>({});
  const [timeLimit, setTimeLimit] = useState("");
  const [multipleAttempts, setMultipleAttempts] = useState<any>({});
  const [howManyAttempts, setHowManyAttempts] = useState("");
  const [showCorrectAnswers, setShowCorrectAnswers] = useState<any>({});
  const [accessCode, setAccessCode] = useState("");
  const [oneQuestionAtATime, setOneQuestionAtATime] = useState<any>({});
  const [webcamRequired, setWebcamRequired] = useState<any>({});
  const [lockQuestionsAfterAnswering, setLockQuestionsAfterAnswering] = useState<any>({});
  const [dueDate, setDueDate] = useState("");
  const [availableDate, setAvailableDate] = useState("");
  const [availableUntilDate, setAvailableUntilDate] = useState("");
  const [published, setPublished] = useState<any>({});

  const quizzes = useSelector((state: any) => state.quizzesReducer.quizzes);
  const quiz = quizzes.find((quiz: any) => quiz._id === qid);

  useEffect(() => {
    if (quiz) {
      setTitle(quiz.title);
      setDescription(quiz.description);
      setQuizType(quiz.quizType);
      setPoints(quiz.points);
      setAssignmentGroup(quiz.assignmentGroup);
      setShuffleAnswers(quiz.shuffleAnswers);
      setTimeLimit(quiz.timeLimit);
      setMultipleAttempts(quiz.multipleAttempts);
      setHowManyAttempts(quiz.howManyAttempts);
      setShowCorrectAnswers(quiz.showCorrectAnswers);
      setAccessCode(quiz.accessCode);
      setOneQuestionAtATime(quiz.oneQuestionAtATime);
      setWebcamRequired(quiz.webcamRequired);
      setLockQuestionsAfterAnswering(quiz.lockQuestionsAfterAnswering);
      setDueDate(quiz.dueDate ? quiz.dueDate.split("T")[0] : ""); // Format to YYYY-MM-DD
      setAvailableDate(quiz.availableDate ? quiz.availableDate.split("T")[0] : "");
      setAvailableUntilDate(quiz.availableUntilDate ? quiz.availableUntilDate.split("T")[0] : "");
      setPublished(quiz.published);
    }
  }, [quiz]);  // Dependencies array includes quiz to run effect when it changes



    const saveQuiz = async (updatedQuiz: any) => {
      try {
        await quizzesClient.updateQuiz(updatedQuiz); // API call
        dispatch(updateQuiz(updatedQuiz)); // Update Redux state
        navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}`); // Navigate back to quizzes
      } catch (error) {
        console.error("Error updating quiz:", error);
      }
    };

    const saveAndPublishQuiz = async (updatedQuiz: any) => {
        // Set the 'published' property to true
        const quizToPublish = {
        ...updatedQuiz,
        published: true
        };
        try {
          await quizzesClient.updateQuiz(quizToPublish); // API call
          dispatch(updateQuiz(quizToPublish)); // Update Redux state
          navigate(`/Kanbas/Courses/${cid}/Quizzes`); // Navigate back to quizzes
        } catch (error) {
          console.error("Error updating quiz:", error);
        }
      };
  

  const { currentUser } = useSelector((state: any) => state.accountReducer);
    // Check if the user has FACULTY role
    const isFaculty = currentUser?.role === "FACULTY";



    return (
      <div id="wd-quizzes-editor" className="container mt-4">

        <div className="row mb-4">
          <div className="col">
            <input id="wd-quiz-name" defaultValue={quiz && quiz.title} 
            placeholder="Unnamed Quiz"
            onChange={(e) => setTitle(e.target.value)}
            className="form-control" 
            readOnly={!isFaculty} />
          </div>
        </div>

        <div className="row mb-4">
          <div className="col">
            <h5>Quiz Instructions:</h5>
            {/* <textarea id="wd-quiz-description" defaultValue={quiz && quiz.description} 
            onChange={(e) => setDescription(e.target.value)}
            className="form-control" rows={10}
            readOnly={!isFaculty} >
            </textarea> */}
            <SimpleWysiwyg
                value={description} onChange={(e) => setDescription(e.target.value)}
                />
          </div>
        </div>


        <div className="row mb-4 justify-content-end">
          <div className="col-4 d-flex justify-content-end align-items-center">
            <label htmlFor="wd-quiz-type">Quiz Type</label>
          </div>
          <div className="col-8 d-flex justify-content-end align-items-center">
            <select id="wd-quiz-type" className="form-select"
            disabled={!isFaculty} defaultValue={quiz.quizType}
            onChange={(e) => setQuizType(e.target.value)} >
              <option value="GRADED-QUIZ">Graded Quiz</option>
              <option value="PRACTICE-QUIZ">Practice Quiz</option>
              <option value="GRADED-SURVEY">Graded Survey</option>
              <option value="UNGRADED-SURVEY">Ungraded Survey</option>
            </select>
          </div>
          </div>

        <div className="row mb-4 justify-content-end">
          <div className="col-4 d-flex justify-content-end align-items-center">
            <label htmlFor="wd-quiz-points">Points</label>
          </div>
          <div className="col-8 d-flex justify-content-end align-items-center">
            <input id="wd-quiz-points" defaultValue={quiz && quiz.points} 
            type="number" onChange={(e) => setPoints(e.target.value)}
            className="form-control" 
            readOnly={!isFaculty} />
          </div>
          </div>

          <div className="row mb-4 justify-content-end">
          <div className="col-4 d-flex justify-content-end align-items-center">
            <label htmlFor="wd-quiz-group">Assignment Group</label>
          </div>
          <div className="col-8 d-flex justify-content-end align-items-center">
            <select id="wd-quiz-group" className="form-select"
            disabled={!isFaculty} defaultValue={quiz.assignmentGroup}
            onChange={(e) => setAssignmentGroup(e.target.value)} >
              <option value="QUIZZES">Quizzes</option>
              <option value="EXAMS">Exams</option>
              <option value="ASSIGNMENTS" >Assignments</option>
              <option value="PROJECT">Project</option>
            </select>
          </div>
        </div>


  {/* Submission Type */}
<div className="row mb-4 align-items-top">

  <div className="col-4 text-end">
    {/* <label htmlFor="wd-submission-type" className="col-form-label">Submission Type</label> */}
  </div>

  <div className="col-8 border rounded p-3">

  {/* Options */}
  <div className="col-4 text-end">
  </div>
  <div className="col-8">
  <label htmlFor="wd-quiz-options" className="col-form-label"><b>Options</b></label>
    <div className="form-check">

    <div>
      <input className="form-check-input" type="checkbox" id="wd-quiz-shuffle-answers" disabled={!isFaculty}
      defaultChecked={quiz.shuffleAnswers}
      onChange={(e) => setShuffleAnswers( e.target.checked ) }  />
      <label className="form-check-label" htmlFor="wd-quiz-shuffle-answers">Shuffle Answers</label><br />
    </div>


    <div className="d-flex align-items-center">
      <input className="form-check-input" type="checkbox" id="wd-quiz-time-limit" disabled={!isFaculty}
      defaultChecked={true} 
    //   onChange={(e) => setMultipleAttempts(e.target.checked )} 
      />
      <label className="form-check-label col-4" htmlFor="wd-quiz-time-limit">&#20; Time Limit</label>
      <input className="form-control me-2" id="wd-quiz-time-limit-input" disabled={!isFaculty}
      type="number" defaultValue={quiz.timeLimit} onChange={(e) => setTimeLimit(e.target.value)} />
      <label className="form-check-label col-3" htmlFor="wd-quiz-time-limit-input">Minutes</label><br/>
    </div>

    <div>
      <input className="form-check-input" type="checkbox" id="wd-quiz-multiple-attempts" disabled={!isFaculty}
      defaultChecked={quiz.multipleAttempts} 
      onChange={(e) => setMultipleAttempts(e.target.checked )} />
      <label className="form-check-label" htmlFor="wd-quiz-multiple-attempts">Multiple Attempts</label><br />
    </div>

    <div className="d-flex align-items-center">
      <label className="form-check-label col-5" htmlFor="wd-quiz-howManyAttempts">How Many Attempts</label>
      <input className="form-control me-2" id="wd-quiz-howManyAttempts" disabled={!isFaculty}
      defaultValue={quiz.howManyAttempts} onChange={(e) => setHowManyAttempts(e.target.value)} />
    </div>

    <div>
      <input className="form-check-input" type="checkbox" id="wd-quiz-showCorrectAnswers" disabled={!isFaculty}
      defaultChecked={quiz.showCorrectAnswers} 
      onChange={(e) => setShowCorrectAnswers(e.target.checked )} />
      <label className="form-check-label" htmlFor="wd-quiz-showCorrectAnswers">Show Correct Answers</label><br />
    </div>

    <div className="d-flex align-items-center">
      <label className="form-check-label col-4" htmlFor="wd-quiz-access-code">Access Code</label>
      <input className="form-control me-2" id="wd-quiz-access-code" disabled={!isFaculty}
      defaultValue={quiz.accessCode} onChange={(e) => setAccessCode(e.target.value)} />
    </div>

    <div>
      <input className="form-check-input" type="checkbox" id="wd-quiz-oneQuestionAtATime" disabled={!isFaculty}
      defaultChecked={quiz.oneQuestionAtATime} 
      onChange={(e) => setOneQuestionAtATime(e.target.checked )} />
      <label className="form-check-label" htmlFor="wd-quiz-oneQuestionAtATime">One Question at a Time</label><br />
    </div>

    <div>
      <input className="form-check-input" type="checkbox" id="wd-quiz-webcamRequired" disabled={!isFaculty}
      defaultChecked={quiz.webcamRequired} 
      onChange={(e) => setWebcamRequired(e.target.checked )} />
      <label className="form-check-label" htmlFor="wd-quiz-webcamRequired">Webcam Required</label><br />
    </div>

    <div>
      <input className="form-check-input" type="checkbox" id="wd-quiz-lockQuestionsAfterAnswering" disabled={!isFaculty}
      defaultChecked={quiz.lockQuestionsAfterAnswering} 
      onChange={(e) => setLockQuestionsAfterAnswering(e.target.checked )} />
      <label className="form-check-label" htmlFor="wd-quiz-lockQuestionsAfterAnswering">Lock Questions After Answering</label><br />
    </div>

    </div>
  </div>
  </div>

</div>



{/* Assign */}
<div className="row mb-4 align-items-top">
  <div className="col-4 text-end">
    <label htmlFor="wd-quiz-assign" className="col-form-label">Assign</label>
  </div>

  <div className="col-8 border rounded p-3">

  <label htmlFor="wd-quiz-assign-to" className="col-form-label"><b>Assign to</b></label>
    <input id="wd-quiz-assign-to" defaultValue="Everyone" className="form-control" 
    readOnly={!isFaculty} />

    <label htmlFor="wd-quiz-due-date" className="col-form-label">Due</label>
    <input type="date" id="wd-quiz-due-date" value={dueDate} 
            onChange={(e) => setDueDate(e.target.value)}
            className="form-control" 
    readOnly={!isFaculty} />


    <div className="row">
      <div className="col">
        <label htmlFor="wd-quiz-available-from" className="col-form-label">Available from</label>
        <input type="date" id="wd-quiz-available-from" value={availableDate} 
        onChange={(e) => setAvailableDate(e.target.value)}
        className="form-control" 
        readOnly={!isFaculty} />
      </div>

      <div className="col">
        <label htmlFor="wd-quiz-available-until" className="col-form-label">Until</label>
        <input type="date" id="wd-quiz-available-until" value={availableUntilDate}
                onChange={(e) => setAvailableUntilDate(e.target.value)}
                className="form-control" 
        readOnly={!isFaculty} />
      </div>
    </div>
  </div>
</div>



<hr />

        <div className="float-end">

        <Link id="wd-quiz-cancel-btn"
            to={`/Kanbas/Courses/${cid}/Quizzes`}
            className="btn btn-lg btn-secondary me-3">
            Cancel </Link>

          <button
          id="wd-quiz-save-btn"
          type="button"
          onClick={() => saveQuiz({
                  _id: quiz._id,
                  title,
                  description,
                  quizType,
                  points,
                  assignmentGroup,
                  shuffleAnswers,
                  timeLimit,
                  multipleAttempts,
                  howManyAttempts,
                  showCorrectAnswers,
                  accessCode,
                  oneQuestionAtATime,
                  webcamRequired,
                  lockQuestionsAfterAnswering,
                  dueDate,
                  availableDate,
                  availableUntilDate,
                })
          }
          className="btn btn-lg btn-danger me-3"
        >
          Save
        </button>


        <button
          id="wd-quiz-saveAndPublish-btn"
          type="button"
          onClick={() => saveAndPublishQuiz({
            _id: quiz._id,
            title,
            description,
            quizType,
            points,
            assignmentGroup,
            shuffleAnswers,
            timeLimit,
            multipleAttempts,
            howManyAttempts,
            showCorrectAnswers,
            accessCode,
            oneQuestionAtATime,
            webcamRequired,
            lockQuestionsAfterAnswering,
            dueDate,
            availableDate,
            availableUntilDate,
            published,
          })
    }
          className="btn btn-lg btn-success"
        >
          Save and Publish
        </button>
          

        </div>
      </div>
    );
}
