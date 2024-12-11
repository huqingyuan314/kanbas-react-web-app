import MultipleChoiceQuestionEditor from "./MultipleChoiceQuestionEditor";
import TrueFalseQuestionEditor from "./TrueFalseQuestionEditor";
import FillBlankQuestionEditor from "./FillBlankQuestionEditor";
import { Navigate, useNavigate, useParams } from "react-router";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { wait } from "@testing-library/user-event/dist/utils";


export default function QuestionEditorType() {

    const { quid } = useParams();
    const navigate = useNavigate();

    const questions = useSelector(
        (state: any) => state.questionsReducer.questions
      );
    const question = questions.find((question: any) => question._id === quid);

    // useEffect(() => {
    //     console.log("Question type changed to:", questionType);
    //   }, [questionType]);

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