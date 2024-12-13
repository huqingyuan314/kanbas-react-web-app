import { MdOutlineEdit } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import parse from "html-react-parser";
import { RxTriangleDown } from "react-icons/rx";
import { setQuestions } from "./Questions/reducer";
import { useEffect, useState } from "react";
import * as quizzesClient from "./client";
import * as userClient from "../../Account/client";
import { Link } from "react-router-dom";
import axios from "axios";
import { FaCheck, FaTimes } from "react-icons/fa";
const axiosWithCredentials = axios.create({ withCredentials: true });


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

export default function QuizResult() {
  const { cid, qid } = useParams(); // Get quizId from URL params
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  const quizzes = useSelector((state: any) => state.quizzesReducer.quizzes);
  const quiz = quizzes.find((quiz: any) => quiz._id === qid);

  const questions = useSelector(
    (state: any) => state.questionsReducer.questions
  );


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


      function dateFormat(date: Date) {
        if (!date) return '';
        const format = new Date(date);
        return format.toISOString().slice(0, 10);
    }

      
      const [newAnswer, setNewAnswer] = useState("");

      const [attempts, setAttempts] = useState<any[]>([]);
      const [quizAttempt, setQuizAttempt] = useState<QuizAttempt | null>(null);
      


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


    if (!quiz) {
        return <p>Quiz data is not available.</p>;
      }

    if (!quizAttempt) {
        return <p>Loading quiz attempt...</p>;
    }


function determineQuestionResultRender(question: {
    trueFalse: boolean;
    choicesAnswer: never;
    _id: string;
    blanks: never[];
    choices: never[];
    questionType: String;
}) {
    if (!quizAttempt) return <div>Loading or no attempt data available...</div>;
    
    const answer = quizAttempt.answers.find((ans: any) => ans.question === question._id);

    switch (question.questionType) {
        case "MULTIPLE-CHOICE":
            return (
              <div>
                <ul>
                  {question.choices.map((choice, index) => (
                    <li key={index}>
                      <input disabled 
                      className="form-check-input ms-2 me-2"
                      type="radio" 
                      name={`question-${question._id}`} 
                      value={choice} 
                      checked={answer?.answerText.includes(choice)}
                      />
                      <span className={`${
                          choice === question.choicesAnswer ? "text-success" : 
                          answer?.answerText.includes(choice) ? "text-danger" : ""
                        }`}>
                        {choice}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            );

            case "TRUE-FALSE":
                return (
                  <div>
                    <ul>
                      {["true", "false"].map((option, index) => (
                        <li key={index}>
                          <input disabled 
                          className="form-check-input ms-2 me-2"
                          type="radio" 
                          name={`question-${question._id}`}
                          value={option}
                          checked={answer?.answerText.includes(option)}
                          />
                          <span className={`${
                              (option === "true" && question.trueFalse) || (option === "false" && !question.trueFalse) ? "text-success" :
                              answer?.answerText.includes(option) ? "text-danger" : ""
                            }`}>
                            {option.charAt(0).toUpperCase() + option.slice(1)}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );

        case "FILL-BLANK":
            return (
                <div>
                    {answer && answer.answerText.map((ansText, index) => (
                        <input key={index}
                            type="text"
                            name={`question-${question._id}`}
                            className={`form-control ms-4 me-2 ${answer.correct ? "text-success" : "text-danger"}`}
                            value={ansText}
                            disabled
                        />
                    ))}
                    <span className={`ms-4 me-2`}>Possible Answers:</span>
                    {question && question.blanks.map((ansText, index) => (
                        <input key={index}
                            type="text"
                            name={`question-${question._id}`}
                            className={`form-control ms-4 me-2 text-success`}
                            value={ansText}
                            disabled
                        />
                    ))}
                </div>
            );

        default:
            return <div>Unsupported question type</div>;
    }
}



  const handleIcon =  (qid: String) => {
    const answer = quizAttempt.answers.find((answer: any) => answer.question === qid);
    if (answer && answer.correct) {
        return <FaCheck className="text-success float-begin fs-3" />;
    } else if (answer && !answer.correct) {
        return <FaTimes className="text-danger float-begin fs-3" />;
    }
    return null;
    };




  ////////////////////////////////////////////////////////////////////////////////

  return (
    <div>
      <h3>{quiz.title}</h3>

      <hr />

      <h5>Attempt History</h5>
      <br />

      <div className="row mb-1 justify-content-between">
          <div className="col-2 d-flex justify-content-begin align-items-center">
            <b></b>
          </div>
          <div className="col-2 d-flex justify-content-begin align-items-center">
            <b></b>
          </div>
          <div className="col-2 d-flex justify-content-begin align-items-center">
            <b>Attempt</b>
          </div>
          <div className="col-2 d-flex justify-content-begin align-items-center">
            <b>Attempt Date</b>
          </div>
          <div className="col-2 d-flex justify-content-begin align-items-center">
            <b>Score</b>
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
             LATEST
          </div>
          <div className="col-2 d-flex justify-content-begin align-items-center">
            {`Attempt 1`}
          </div>
          <div className="col-2 d-flex justify-content-begin align-items-center">
            {dateFormat(quizAttempt.attemptDate)}
          </div>
          <div className="col-2 d-flex justify-content-begin align-items-center">
            <b>{`${quizAttempt.score}`}</b> &thinsp; {` out of ${quiz.points}`}
          </div>
          <div className="col-2 d-flex justify-content-begin align-items-center">
            <b></b>
          </div>
        </div>

        <hr />
        <br />


<ul id="wd-quiz-preview-total" className="list-group rounded-0"
      style={{width: "80%", margin: "0 auto"}}>
        <li className="wd-questions-total list-group-item p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary">
            <RxTriangleDown className="me-2 fs-4" />
            Question Group
          </div>

    <ul className="wd-quiz-preview list-group rounded-0 fs-6">
    {questions.map((question: any) => (
        <li key={question._id} className="wd-questions list-group-item p-3 ps-1">
            <div className="d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center">

                 <div>
                        {handleIcon(question._id)}

                        <span className="wd-question-link text-danger text-decoration-none">
                        {question.title}
                        </span>
                        
                        

                        <div className="text-muted small">
                            <b>{question.questionType}</b> | {question.points ?? 'N/A'} pts <br/>
                        </div>
                        <h6> {parse(question.description)} </h6>

                        {determineQuestionResultRender(question)}

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

        <Link id="wd-quiz-preview-cancel-btn"
            to={`/Kanbas/Courses/${cid}/Quizzes/${qid}`}
            className="btn btn-lg btn-secondary me-3">
            Cancel </Link>

        </div>

    </div>
  );
}
