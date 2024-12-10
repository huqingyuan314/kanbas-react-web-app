import MultipleChoiceQuestionEditor from "./MultipleChoiceQuestionEditor";
import TrueFalseQuestionEditor from "./TrueFalseQuestionEditor";
import FillBlankQuestionEditor from "./FillBlankQuestionEditor";
import { useNavigate, useParams } from "react-router";
import { useSelector } from "react-redux";


export default function QuestionEditorType() {

    const { quid } = useParams();

    const questions = useSelector(
        (state: any) => state.questionsReducer.questions
      );
    const question = questions.find((question: any) => question._id === quid);

    function determineEditor(question: { questionType: String; }) {
    
        if ( question.questionType === "MULTIPLE-CHOICE" ) {
            return <MultipleChoiceQuestionEditor />
        } else if (question.questionType === "TRUE-FALSE") {
            return <TrueFalseQuestionEditor />
        } else if (question.questionType === "FILL-BLANK") {
            return <FillBlankQuestionEditor />
        } else {
            return
        }
    }

    return (
        <div>
            {determineEditor(question)}
        </div>

        );
}