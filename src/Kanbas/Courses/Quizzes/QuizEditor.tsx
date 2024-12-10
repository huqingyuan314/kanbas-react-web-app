import { IoEllipsisVertical } from "react-icons/io5";
import { useLocation, useNavigate, Outlet, useParams } from "react-router-dom";
import GreenCheckmark from "../Modules/GreenCheckmark";
import { RiProhibitedLine } from "react-icons/ri";
import { useSelector } from "react-redux";

export default function QuizEditor() {
    const location = useLocation();
    const navigate = useNavigate();
    const { qid } = useParams();

    const quizzes = useSelector((state: any) => state.quizzesReducer.quizzes);
    const quiz = quizzes.find((quiz: any) => quiz._id === qid);

    return (

    <div>
        <br/>

        <div id="wd-quiz-editor-controls" 
            className="d-flex justify-content-end align-items-center text-nowrap">

    <label className="me-3" >Points {quiz.points}</label>

    {quiz.published ? <GreenCheckmark /> 
                      : <RiProhibitedLine className="me-1 fs-4 text-danger" /> }
    {quiz.published ? <label className="me-3" >Published</label> 
                      : <label className="text-secondary me-3" >Not Published</label>}

      <button id="wd-add-group-btn" className="btn btn-secondary me-2">
        <IoEllipsisVertical className="position-relative" style={{ bottom: "1px" }} />
      </button>



        </div>
        <hr />




        <div>
            <ul className="nav nav-tabs">
                <li className="nav-item">
                    <a
                        id="wd-quiz-details-editor"
                        onClick={() => navigate("QuizDetailsEditor")}
                        className={`nav-link ${location.pathname.includes("QuizDetailsEditor") ? "active" : "text-danger"}`}
                    >
                        Details
                    </a>
                </li>
                <li className="nav-item">
                    <a
                        id="wd-quiz-questions-editor"
                        onClick={() => navigate("QuizQuestionsEditor")}
                        className={`nav-link ${location.pathname.includes("QuizQuestionsEditor") ? "active" : "text-danger"}`}
                    >
                        Questions
                    </a>
                </li>
            </ul>

            <Outlet />  {/* This will render the nested route components */}
        </div>


    </div>
    );
}