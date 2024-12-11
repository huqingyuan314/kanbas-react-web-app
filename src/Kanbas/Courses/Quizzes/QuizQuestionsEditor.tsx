import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { FaPlus, FaTrash } from "react-icons/fa6";

import {
    addQuestion, deleteQuestion, updateQuestion, editQuestion, setQuestions
} from "./Questions/reducer";
import * as quizzesClient from "./client";
import * as questionsClient from "./Questions/client";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { BsGripVertical } from "react-icons/bs";
import { RxTriangleDown } from "react-icons/rx";
import { FiEdit } from "react-icons/fi";
import { wait } from "@testing-library/user-event/dist/utils";
import QuestionEditor from "./Questions/QuestionEditor";
import { updateQuiz } from "./reducer";

export default function QuizQuestionsEditor() {

    const { cid, qid, quid } = useParams();
    const navigate = useNavigate(); // Use navigate hook
    const dispatch = useDispatch();
    const location = useLocation();  // Get the current path
    const { currentUser } = useSelector((state: any) => state.accountReducer);

    const quizzes = useSelector((state: any) => state.quizzesReducer.quizzes);
    const quiz = quizzes.find((quiz: any) => quiz._id === qid);

    const questions = useSelector(
        (state: any) => state.questionsReducer.questions
      );

    const createQuestion = async () => {
        if (!qid) return;
        const newQuestion = { 
          title: `Default Question ${questions.length + 1}`, 
          description: "Default question description, please modify it.",
          questionType: "MULTIPLE-CHOICE",
          choices: [
            { identifier: "A" , text: "Option A" },
            { identifier: "B" , text: "Option B" },
            { identifier: "C" , text: "Option C" },
            { identifier: "D" , text: "Option D" },
        ],
          choicesAnswer: "A",
          trueFalse: true,
          blanks: [""],
          quiz: qid,
        };
        const question = await quizzesClient.createQuestionForQuiz(qid, newQuestion);
        dispatch(addQuestion(question));
        navigate("../QuizDetailsEditor");
        wait(50);
        navigate(-1);
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


          const removeQuestion = async (quesionId: string) => {
            await questionsClient.deleteQuestion(quesionId);
            dispatch(deleteQuestion(quesionId));
          };

        function determineQuestionRender(question: {
          blanks: never[];
          choices: never[]; questionType: String; 
        }) {
    
            if ( question.questionType === "MULTIPLE-CHOICE" ) {
                return (<ol>
                {(question.choices ?? []).map((choice: any) => (
                    <li key={choice.identifier}>{choice.text}</li>
                ))}
                </ol>)
            } else if (question.questionType === "TRUE-FALSE") {
                return (<ol>
                      <li>True</li>
                      <li>False</li>
                        </ol>)
            } else if (question.questionType === "FILL-BLANK") {
                return (<ol>
                  {(question.blanks ?? []).map((blank: any) => (
                      <li key={blank.identifier}>{blank.text}</li>
                  ))}
                  </ol>)
            } else {
                return
            }
        }


    const [points, setPoints] = useState(0);


  useEffect(() => {
    const sum = questions.reduce((acc: any, question: { points: any; }) => acc + (question.points || 0), 0);
    setPoints(sum);
  }, [questions]); // Recalculate when questions change


  useEffect(() => {
    const updateQuizPoints = async () => {
      if (quiz && points !== quiz.points) {
        const updatedQuiz = { ...quiz, points: points };
        try {
          // Assuming you have an API method to update the quiz
          await quizzesClient.updateQuiz(updatedQuiz);
          // Assuming you have a Redux action to update the state
          dispatch(updateQuiz(updatedQuiz));
        } catch (error) {
          console.error("Failed to update quiz points:", error);
        }
      }
    };
  
    updateQuizPoints();
  }, [points, quiz, dispatch]); // Depend on totalPoints and quiz


    // const saveQuestion = async (updatedQuestion: any) => {
    //   try {
    //     await questionsClient.updateQuestion(updatedQuestion); // API call
    //     dispatch(updateQuestion(updatedQuestion)); // Update Redux state
    //     navigate(-1); // Navigate back
    //   } catch (error) {
    //     console.error("Error updating question:", error);
    //   }
    // };



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

<ul id="wd-questions-total" className="list-group rounded-0"
      style={{width: "80%", margin: "0 auto"}}>
        <li className="wd-questions-total list-group-item p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary">
            <RxTriangleDown className="me-2 fs-4" />
            Question Group
          </div>



    <ul className="wd-questions list-group rounded-0 fs-6">
    {questions.map((question: any) => (
        <li key={question._id} className="wd-questions list-group-item p-3 ps-1">
            <div className="d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center">
                    <BsGripVertical className="me-2 fs-3" />



              { location.pathname.includes(`${quid}`)? <QuestionEditor />
                :  <div>

                  <div className="float-end ">
                      

                        <a
                            className="wd-question-link text-danger text-decoration-none float-begin"
                            href={`#/Kanbas/Courses/${cid}/Quizzes/${qid}/QuizEditor/QuizQuestionsEditor/${question._id}`}   
                             
                        >
                            <FiEdit onClick={() => editQuestion(question._id)}
                          className="me-4 fs-5 text-success" />
                        </a>

                        <FaTrash onClick={() => removeQuestion(question._id)}
                          className="me-4 fs-5 text-danger" />

                  </div>

                        <span className="wd-question-link text-danger text-decoration-none">
                        {question.title}
                        </span>

                        <div className="text-muted small">
                            <b>{question.questionType}</b> | {question.points ?? 'N/A'} pts <br/>
                        </div>
                        <h6> {question.description} </h6>

                        {determineQuestionRender(question)}

                    </div>
                  }

                    

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

          <Link
          id="wd-quiz-save-btn"
          
          to={`/Kanbas/Courses/${cid}/Quizzes/${qid}`}
          className="btn btn-lg btn-danger me-3"
        >
          Save
        </Link>

        </div>


    </div>
  )
}