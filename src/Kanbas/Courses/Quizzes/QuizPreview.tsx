import { MdOutlineEdit } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import parse from "html-react-parser";
import { RxTriangleDown } from "react-icons/rx";
import { setQuestions } from "./Questions/reducer";
import { useEffect } from "react";
import * as quizzesClient from "./client";
import * as userClient from "../../Account/client";
import { Link } from "react-router-dom";

export default function QuizPreview() {
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
                name={`question-${question._id}`} value="True" /> True
              </li>
              <li>
                <input type="radio" className="form-check-input ms-2 me-2" 
                name={`question-${question._id}`} value="False" /> False
              </li>
            </ul>
          </div>
        );
  
      case "FILL-BLANK":
        return (
          <div>
            <input type="text" placeholder="Enter your answer" className="form-control ms-4 me-2" />
          </div>
        );
  
      default:
        return <div>Unsupported question type</div>;
    }
  }


//   const handleSubmitQuiz = async (quizId: string) => {
//     const responses = questions.map((question: { _id: any; }) => {
//       return {
//         questionId: question._id,
//         answer: document.querySelector(`input[name="question-${question._id}"]:checked`)?.value
//       };
//     });
  
//     try {
//       await userClient.attemptUserInQuiz(currentUser._id, quizId);
//       navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}/Results`);
//     } catch (error) {
//       console.error("Failed to submit quiz:", error);
//     }
//   };


const handleSubmitQuiz = async (quizId: string) => {

    const responses = questions.map((question: any) => {
      const answerText: any[] = []; // This could be an array if multiple answers are allowed
      document.querySelectorAll(`input[name="question-${question._id}"]:checked`).forEach((input) => {
        if (input instanceof HTMLInputElement) {
          answerText.push(input.value); // Now TypeScript knows `input` has a `value` property.
        }
      });
  
      // Assuming you have a way to determine if the answer is correct on the client-side
      // It's more secure to handle this server-side
      const correct = checkIfAnswerIsCorrect(question._id, answerText); 
  
      return {
        question: question._id,
        answerText,
        correct,
      };
    });
  
    const totalScore = calculateScore(responses); // Function to calculate score based on correct answers
  
    try {
      // Assuming your API expects a POST request with a specific body
      await userClient.attemptUserInQuiz(
        currentUser._id,
        quizId,
        responses,
        totalScore,
        true,
      );
      navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}/QuizResult`);
    } catch (error) {
      console.error("Failed to submit quiz:", error);
    }
  };
  
  function checkIfAnswerIsCorrect(questionId: String, answerText: any) {
    // This should check against the correct answers stored in the state or fetched
    // For example, comparing with correct answers fetched with the quiz details
    // This is a simplified placeholder
    return answerText.includes("correct-answer-from-state");
  }
  
  function calculateScore(responses: any) {
    // Calculate score based on the 'correct' field of each response
    return responses.reduce((score: any, response: any) => score + (response.correct ? 1 : 0), 0);
  }
//   {question.points}

  ////////////////////////////////////////////////////////////////////////////////

  return (
    <div>
      <h3>{quiz.title}</h3>

      <div className="mb-1 d-flex">
        <button
          onClick={() =>
            navigate(`../Quizzes/${qid}/QuizEditor/QuizQuestionsEditor`)
          }
          id="wd-quiz-edit-btn"
          className="btn btn-lg btn-secondary me-4"
        >
          <MdOutlineEdit
            className="position-relative me-2"
            style={{ bottom: "1px" }}
          />
          Edit Quiz
        </button>
      </div>

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
        //   onClick={() => saveQuizAttempt({
        //           _id: quiz._id,
        //           title,
        //           description,
        //           quizType,
        //           points,
        //         })
        //   }

        onClick={ () => handleSubmitQuiz(quiz._id) }

          className="btn btn-lg btn-danger me-3"
        >
          Submit Quiz
        </button>


        
          

        </div>

    </div>
  );
}
