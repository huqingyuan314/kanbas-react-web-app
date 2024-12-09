import { useLocation, useNavigate } from "react-router";


export default function QuizEditor() {

    const { pathname } = useLocation();
    const navigate = useNavigate();

return (
<div>


<ul className="nav nav-pills">

<li className="nav-item">
  <a
    id="wd-quiz-details-editor"
    onClick={ () => navigate(`QuizDetailsEditor`) }
    className={`nav-link ${pathname.includes("QuizDetailsEditor") ? "active" : ""}`}
  >
    Details
  </a>
</li>

<li className="nav-item">
  <a
    id="wd-quiz-questions-editor"
    onClick={ () => navigate(`QuizQuestionsEditor`) }
    className={`nav-link ${pathname.includes("QuizQuestionsEditor") ? "active" : ""}`}
  >
    Questions
  </a>
</li>
</ul>

</div>
)
}