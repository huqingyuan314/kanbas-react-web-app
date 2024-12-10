import { Link, useNavigate, useParams } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";

import {
    addQuestion, deleteQuestion, updateQuestion, editQuestion, setQuestions
} from "./Questions/reducer";
import * as quizzesClient from "./client";
import * as questionsClient from "./Questions/client";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { BsGripVertical } from "react-icons/bs";
import { RxTriangleDown } from "react-icons/rx";
import { FiEdit } from "react-icons/fi";

export default function QuizQuestionsEditor() {

    const { cid, qid, quid } = useParams();
    const navigate = useNavigate(); // Use navigate hook
    const dispatch = useDispatch();
    const { currentUser } = useSelector((state: any) => state.accountReducer);

    const questions = useSelector(
        (state: any) => state.questionsReducer.questions
      );

    const createQuestion = async () => {
        if (!qid) return;
        const newQuestion = { 
          title: `Default Question ${questions.length + 1}`, 
          description: "Default question description, please modify it.",
          choices: [
            { identifier: "A" , text: "Option A" },
            { identifier: "B" , text: "Option B" },
            { identifier: "C" , text: "Option C" },
            { identifier: "D" , text: "Option D" },
        ],
          quiz: qid,
        };
        const question = await quizzesClient.createQuestionForQuiz(qid, newQuestion);
        dispatch(addQuestion(question));
        navigate(`${question._id}`);
        };


    const fetchQuestions = async () => {
        try {
            const questions = await quizzesClient.findQuestionsForQuiz(qid as string);
            dispatch(setQuestions(questions));
          } catch (error) {
            console.error("Failed to fetch questions:", error);
          }
        };
        useEffect(() => {
            if (qid) {
                fetchQuestions();
            }
          }, [qid]);



  return (
    <div>

    <br/>
    <div className="mb-1 d-flex justify-content-center">
      <button 
        onClick={createQuestion}
      id="wd-new-question-btn" className="btn btn-lg btn-secondary me-4">
        <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
        New Question
      </button>
      </div>
    <br/>

<ul id="wd-questions-total" className="list-group rounded-0">
        <li className="wd-questions-total list-group-item p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary">
            {/* <BsGripVertical className="me-2 fs-3" /> */}
            <RxTriangleDown className="me-2 fs-4" />
            Question Group
          </div>

    <ul className="wd-questions list-group rounded-0 fs-6">
    {questions.map((question: any) => (
        <li key={question._id} className="wd-questions list-group-item p-3 ps-1">
            <div className="d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center">
                    <BsGripVertical className="me-2 fs-3" />

                    <div>
                        <a
                            className="wd-question-link text-danger text-decoration-none"
                            href={`#/Kanbas/Courses/${cid}/Quizzes/${qid}/QuizEditor/QuizQuestionsEditor/${question._id}`}   
                             
                        >
                            <FiEdit  onClick={() => editQuestion(question._id)}
                          className="me-4 fs-5 text-success" />
                            
                        </a>
                        <span className="wd-question-link text-danger text-decoration-none">
                        {question.title}
                        </span>


                        <div className="text-muted small">
                            <b>{question.questionType}</b> | {question.points ?? 'N/A'} pts <br/>
                        </div>
                        <h6> {question.description} </h6>
                        <ol>
                            {(question.choices ?? []).map((choice: any) => (
                                <li key={choice.identifier}>{choice.text}</li>
                            ))}
                        </ol>
                    </div>

                </div>
            </div>
        </li>
    ))}
</ul>
        </li>
      </ul>

        <hr />
        <div className="float-end">

        <Link id="wd-quiz-cancel-btn"
            to={`/Kanbas/Courses/${cid}/Quizzes`}
            className="btn btn-lg btn-secondary me-3">
            Cancel </Link>

          <button
          id="wd-quiz-save-btn"
          type="button"
        //   onClick={}
          className="btn btn-lg btn-danger me-3"
        >
          Save
        </button>

        </div>


    </div>
  )
}