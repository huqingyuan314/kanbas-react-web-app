import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams, useNavigate } from "react-router";

import { Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';

import { addQuiz, deleteQuiz, updateQuiz, editQuiz } from "./reducer";
import * as coursesClient from "../client";
import * as quizzesClient from "./client";


export default function QuizDetailsEditor() {
  const { qid, cid } = useParams();

  const location = useLocation();  // Get the current path
  const navigate = useNavigate(); // Use navigate hook
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [points, setPoints] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [availableDate, setAvailableDate] = useState("");
  const [availableUntilDate, setAvailableUntilDate] = useState("");

  const quizzes = useSelector((state: any) => state.quizzesReducer.quizzes);
  const quiz = quizzes.find((quiz: any) => quiz._id === qid);

  useEffect(() => {
    if (quiz) {
      setTitle(quiz.title);
      setDescription(quiz.description);
      setPoints(quiz.points);

      setDueDate(quiz.dueDate ? quiz.dueDate.split("T")[0] : ""); // Format to YYYY-MM-DD
      setAvailableDate(quiz.availableDate ? quiz.availableDate.split("T")[0] : "");
      setAvailableUntilDate(quiz.availableUntilDate ? quiz.availableUntilDate.split("T")[0] : "");
    }
  }, [quiz]);  // Dependencies array includes quiz to run effect when it changes


  // Save button handler
  const createQuiz = async () => {
    if (!cid) return;
    const newQuiz = { 
      title: title, 
      description: description, 
      points: points,
      dueDate: dueDate,
      availableDate: availableDate,
      availableUntilDate: availableUntilDate,
      course: cid 
    };
    const quiz = await coursesClient.createQuizForCourse(cid, newQuiz);
    dispatch(addQuiz(quiz));
    navigate(`/Kanbas/Courses/${cid}/Quizzes`);
    };

    const editAndUpdateQuiz = async (updatedQuiz: any) => {
      try {
        await quizzesClient.updateQuiz(updatedQuiz); // API call
        dispatch(updateQuiz(updatedQuiz)); // Update Redux state
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
            <h3>Quiz Instructions:</h3>
            <textarea id="wd-quiz-description" defaultValue={quiz && quiz.description} 
            onChange={(e) => setDescription(e.target.value)}
            className="form-control" rows={10}
            readOnly={!isFaculty} >
            </textarea>
          </div>
        </div>



        <div className="row mb-4 justify-content-end">
          <div className="col-4 d-flex justify-content-end align-items-center">
            <label htmlFor="wd-quiz-points">Points</label>
          </div>
          <div className="col-8 d-flex justify-content-end align-items-center">
            <input id="wd-quiz-points" defaultValue={quiz && quiz.points} 
            onChange={(e) => setPoints(e.target.value)}
            className="form-control" 
            readOnly={!isFaculty} />
          </div>
          </div>

          <div className="row mb-4 justify-content-end">
          <div className="col-4 d-flex justify-content-end align-items-center">
            <label htmlFor="wd-quiz-type">Quiz Type</label>
          </div>
          <div className="col-8 d-flex justify-content-end align-items-center">
            <select id="wd-quiz-type" className="form-control"
            disabled={!isFaculty} >
              <option value="PERCENTAGE" selected>Graded Quiz</option>
              <option value="SCORE">Practice Quiz</option>
              <option value="LETTER">Graded Survey</option>
              <option value="PASS">Ungraded Survey</option>
            </select>
          </div>
          </div>

          <div className="row mb-4 justify-content-end">
          <div className="col-4 d-flex justify-content-end align-items-center">
            <label htmlFor="wd-quiz-group">Assignment Group</label>
          </div>
          <div className="col-8 d-flex justify-content-end align-items-center">
            <select id="wd-quiz-group" className="form-control"
            disabled={!isFaculty} >
              <option value="QUIZZES" selected>Quizzes</option>
              <option value="EXAMS">Exams</option>
              <option value="ASSIGNMENTS" >Assignments</option>
              <option value="PROJECT">Project</option>
            </select>
          </div>
        </div>


  {/* Submission Type */}
<div className="row mb-4 align-items-top">

  <div className="col-4 text-end">
    <label htmlFor="wd-submission-type" className="col-form-label">Submission Type</label>
  </div>

  <div className="col-8 border rounded p-3">
  <div className="col">
    <select id="wd-submission-type" className="form-control"
    disabled={!isFaculty} >
      <option value="ONLINE" selected>Online</option>
      <option value="ON PAPER">On Paper</option>
      <option value="EXTERNAL TOOL">External Tool</option>
      <option value="NO SUBMISSION">No Submission</option>
    </select>
  </div>


  {/* Online Entry Options */}
  <div className="col-4 text-end">
  </div>
  <div className="col-8">
  <label htmlFor="wd-online-entry-options" className="col-form-label"><b>Online Entry Options</b></label>
    <div className="form-check">
      <input className="form-check-input" type="checkbox" id="wd-text-entry" disabled={!isFaculty} />
      <label className="form-check-label" htmlFor="wd-text-entry">Text Entry</label><br />
      
      <input className="form-check-input" type="checkbox" id="wd-website-url" disabled={!isFaculty} />
      <label className="form-check-label" htmlFor="wd-website-url">Website URL</label><br />
      
      <input className="form-check-input" type="checkbox" id="wd-media-recordings" disabled={!isFaculty} />
      <label className="form-check-label" htmlFor="wd-media-recordings">Media Recordings</label><br />
      
      <input className="form-check-input" type="checkbox" id="wd-student-annotation" disabled={!isFaculty} />
      <label className="form-check-label" htmlFor="wd-student-annotation">Student Annotation</label><br />
      
      <input className="form-check-input" type="checkbox" id="wd-file-upload" disabled={!isFaculty} />
      <label className="form-check-label" htmlFor="wd-file-upload">File Uploads</label>
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
            className="btn btn-lg btn-secondary me-2">
            Cancel </Link>

            {isFaculty && (
          <button
          id="wd-quiz-save-btn"
          type="button"
          onClick={() =>
            location.pathname.includes("QuizDatailsEditor")
              ? createQuiz()
              : editAndUpdateQuiz({
                  _id: quiz._id,
                  title,
                  description,
                  points,
                  dueDate,
                  availableDate,
                  availableUntilDate,
                })
          }
          className="btn btn-lg btn-danger"
        >
          Save
        </button>
             )}

        </div>
      </div>
    );
}
