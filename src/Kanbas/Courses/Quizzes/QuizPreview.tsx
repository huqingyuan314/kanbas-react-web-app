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
import { wait } from "@testing-library/user-event/dist/utils";


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

export default function QuizPreview() {
  const { cid, qid } = useParams(); // Get quizId from URL params
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state: any) => state.accountReducer);

      // Check if the user has FACULTY role
      const isFaculty = currentUser?.role === "FACULTY";

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

      
      const [newAnswer, setNewAnswer] = useState("");

      const [attempts, setAttempts] = useState<any[]>([]);
      const [quizAttempt, setQuizAttempt] = useState<QuizAttempt | null>(null);

      const [attemptNumber, setAttemptNumber] = useState(1);

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

  

      useEffect(() => {
        // Check if the user is a faculty and if the last quiz attempt was completed
        if (currentUser?.role === "FACULTY" && quizAttempt?.isCompleted) {
            // Navigate to QuizResult if conditions are met
            navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}/QuizResult`);
        }
    }, [cid, qid, currentUser, quizAttempt, navigate]);



function determineQuestionPreviewRender(question: {
    _id: any;  // *need check*
    blanks: never[];
    choices: never[];
    questionType: String;
}) {
    switch (question.questionType) {
      case "MULTIPLE-CHOICE":
        return (
          <div>
            <ul>
              {question.choices.map((choice, index) => (
                <li key={index}>
                  <input className="form-check-input ms-2 me-2" type="radio" 
                  name={`question-${question._id}`} value={choice} />
                  {choice}
                </li>
              ))}
            </ul>
          </div>
        );
  
      case "TRUE-FALSE":
        return (
          <div>
            <ul>
              <li>
                <input className="form-check-input ms-2 me-2" type="radio" 
                name={`question-${question._id}`} value="true" /> True
              </li>
              <li>
                <input type="radio" className="form-check-input ms-2 me-2" 
                name={`question-${question._id}`} value="false" /> False
              </li>
            </ul>
          </div>
        );
  
      case "FILL-BLANK":
        return (
          <div>
            <input type="text" name={`question-${question._id}`}
            placeholder="Enter your answer" className="form-control ms-4 me-2"
            value={newAnswer}
            onChange={ (e) => {setNewAnswer(e.target.value)} } />
          </div>
        );
  
      default:
        return <div>Unsupported question type</div>;
    }
  }


//   useEffect(() => {
//     const fetchAttemptNumber = async () => {
//       try {
//         const latestAttemptNumber = await userClient.getLatestAttemptNumber(currentUser._id, qid);
//         setAttemptNumber(latestAttemptNumber + 1); // Prepare for the next attempt
//       } catch (error) {
//         console.error('Failed to fetch attempt number:', error);
//       }
//     };

//     fetchAttemptNumber();
//   }, [currentUser._id, qid]);



const handleSubmitQuiz = async (quizId: string) => {
    const responses = questions.map((question: any) => {
      let answerText: any[] = [];
      const inputs = document.querySelectorAll(`input[name="question-${question._id}"]:checked`);
      const textInput = document.querySelector(`input[type="text"][name="question-${question._id}"]`);

      console.log(`Found ${inputs.length} inputs for question ${question._id}`);

      inputs.forEach((input) => {
        if (input instanceof HTMLInputElement) {
          console.log(`Adding answer: ${input.value}`);
          answerText.push(input.value);
        }
      });

        // Collect value from text input (for fill-in-the-blank)
        if (textInput && textInput instanceof HTMLInputElement) {
            answerText = [textInput.value]; // or push to include multiple answers
        }

      const correct = checkIfAnswerIsCorrect(question, answerText);
        //  const correct = true; // for test

      console.log(`Answers for question ${question._id}:`, answerText);

      return {
        question: question._id,
        answerText,
        correct,
        points: question.points,
      };
    });

    console.log("Final responses:", responses);

    const totalScore = calculateScore(responses);
    
    try {
    const result = await userClient.attemptUserInQuiz(
        currentUser._id,
        quizId,
        responses,
        totalScore,
        true,
        1,
      );
      console.log("QuizAttempt result:", result);
      navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}/QuizResult`);
      
    } catch (error) {
      console.error("Failed to submit quiz:", error);
      
    }
  };



  function checkIfAnswerIsCorrect(question: any, answerText: any) {

    switch (question.questionType) {
        case "MULTIPLE-CHOICE":
            // For multiple-choice, compare the selected answer with the correct answer
            // `question.choicesAnswer` could be the value of the correct option
            return answerText.includes(question.choicesAnswer);
        
        case "TRUE-FALSE":
            // For true/false, `question.trueFalse` should be a boolean
            // `answerText` should contain ['true'] or ['false'] as strings; convert to boolean to check
            return answerText.some((answer: string) => (answer === 'true') === question.trueFalse);

        case "FILL-BLANK":
            // For fill-in-the-blanks, `question.blanks` could be an array of possible correct answers
            // Check if any provided answer is in the array of correct answers
            // This check is case-insensitive and assumes `answerText` is an array of answers
            return answerText.some((answer: string) => 
                question.blanks.map((correct: string) => correct.toLowerCase()).includes(answer.toLowerCase())
            );

        default:
            return false;
    }
}

  
function calculateScore(responses: any[]) {
    return responses.reduce((score, response) => {
      // Add the question's point value if the answer was correct
      return score + (response.correct ? response.points : 0);
    }, 0);
  }



  ////////////////////////////////////////////////////////////////////////////////

  return (
    <div>
      <h3>{quiz.title}</h3>

      {isFaculty && (
      <div className="mb-1 d-flex justify-content-center">
        <button
          onClick={() =>
            navigate(`../Quizzes/${qid}/QuizEditor/QuizQuestionsEditor`)
          }
          id="wd-quiz-edit-btn"
          className="btn btn-lg btn-secondary me-4 "
        >
          <MdOutlineEdit
            className="position-relative me-2"
            style={{ bottom: "1px" }}
          />
          Edit Quiz
        </button>
      </div>
      )}

      <hr />



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

                        <span className="wd-question-link text-danger text-decoration-none">
                        {question.title}
                        </span>

                        <div className="text-muted small">
                            <b>{question.questionType}</b> | {question.points ?? 'N/A'} pts <br/>
                        </div>
                        <h6> {parse(question.description)} </h6>

                        {determineQuestionPreviewRender(question)}

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

          <button
          id="wd-quiz-preview-submit-btn"
          type="button"

        onClick={ () => handleSubmitQuiz(quiz._id) }

          className="btn btn-lg btn-danger me-3"
        >
          Submit Quiz
        </button>


        
          

        </div>

    </div>
  );
}
