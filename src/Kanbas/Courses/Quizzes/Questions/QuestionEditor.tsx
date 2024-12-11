import { Link, useNavigate, useParams } from "react-router-dom";
import QuestionEditorType from "./QuestionEditorType";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as questionsClient from "./client";
import { updateQuestion } from "./reducer";
import { wait } from "@testing-library/user-event/dist/utils";

export default function QuestionEditor( ) {

    const { cid, qid, quid } = useParams();
    const navigate = useNavigate(); // Use navigate hook
    const dispatch = useDispatch();

    const questions = useSelector((state: any) => state.questionsReducer.questions);
    const question = questions.find((question: any) => question._id === quid);
    
    const [title, setTitle] = useState("");
    const [questionType, setQuestionType] = useState("");
    const [points, setPoints] = useState("");

    useEffect(() => {
        if (question) {
          setTitle(question.title);
          setQuestionType(question.questionType);
          setPoints(question.points);
        }
      }, [question]); 


      const updateQuestionType = async (updatedQuestion: any) => {
        try {
          await questionsClient.updateQuestion(updatedQuestion); // API call
          dispatch(updateQuestion(updatedQuestion)); // Update Redux state
        } catch (error) {
          console.error("Error updating questionType:", error);
        }
      };


      const saveQuestion = async (updatedQuestion: any) => {
        try {
          await questionsClient.updateQuestion(updatedQuestion); // API call
          dispatch(updateQuestion(updatedQuestion)); // Update Redux state
          navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}/QuizEditor/QuizQuestionsEditor`); // Navigate back to quizzes
        } catch (error) {
          console.error("Error updating question:", error);
        }
      };


    
    return (
        <div id="wd-questions-editor" className="container mt-4"
            style={{width: "80%", margin: "0 auto"}}>

        <div className="row mb-4">

          <div className="col">
            <input id="wd-question-name col-4" defaultValue={question && question.title} 
            placeholder="Question Title"
            onChange={(e) => setTitle(e.target.value)}
            className="form-control" />
          </div>

          <div className="col-4 d-flex justify-content-end align-items-center">
            <select id="wd-question-type" className="form-select"
             defaultValue={question.questionType}
             onChange={(e) => {
                const newQuestionType = e.target.value;
                setQuestionType(newQuestionType);  // Update state
                updateQuestionType({
                    _id: question._id,
                    title,
                    questionType: newQuestionType,  // Send the new value directly
                    points,
                });
            }} >
              <option value="MULTIPLE-CHOICE">Multiple Choice</option>
              <option value="TRUE-FALSE">True / False</option>
              <option value="FILL-BLANK" >Fill In the Blank</option>
            </select>
          </div>

          <div className="col-2 d-flex justify-content-end align-items-center">
            <label htmlFor="wd-question-points">Pts:</label>
          </div>
          <div className="col-2 d-flex justify-content-end align-items-center">
            <input id="wd-question-points" defaultValue={question && question.points} 
            type="number" onChange={(e) => setPoints(e.target.value)}
            className="form-control" />
          </div>

        </div>



<hr />

        <QuestionEditorType />

<hr />

<div className="float-end">

<Link id="wd-question-editor-cancel-btn"
    to={`/Kanbas/Courses/${cid}/Quizzes/${qid}/QuizEditor/QuizQuestionsEditor`}
    className="btn btn-lg btn-secondary me-3">
    Cancel </Link>

  <button
  id="wd-question-editor-save-btn"
  type="button"
  onClick={
    () => 
        saveQuestion({
          _id: question._id,
          title,
          questionType,
          points,
        })
  }
  className="btn btn-lg btn-danger me-3"
>
  Update Question
</button>

</div>


</div>
        );
        
}