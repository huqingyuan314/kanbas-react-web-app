import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import SimpleWysiwyg from 'react-simple-wysiwyg';
import * as questionsClient from "./client";
import { updateQuestion } from "./reducer";

export default function MultipleChoiceQuestionEditor() {

    const { quid } = useParams();
    const dispatch = useDispatch();
    
    const questions = useSelector(
        (state: any) => state.questionsReducer.questions
      );
    const question = questions.find((question: any) => question._id === quid);

    const [description, setDescription] = useState("");
    const [choices, setChoices] = useState([]);
    const [choicesAnswer, setChoicesAnswer] = useState("");

    useEffect(() => {
        if (question) {
          setDescription(question.description);
          setChoices(question.choices);
          setChoicesAnswer(question.choicesAnswer);
        }
      }, [question, question.questionType]); 


    const updateDescription = async (updatedDescription: any) => {
        try {
          await questionsClient.updateQuestion(updatedDescription); // API call
          dispatch(updateQuestion(updatedDescription)); // Update Redux state
        } catch (error) {
          console.error("Error updating description:", error);
        }
      };


    return (
        <div>
            <h6 className="text-secondary">Enter your question and multiple answers, then select the one correct answer. </h6>
            <h5>Question:</h5>

            <SimpleWysiwyg
                value={description} onChange={(e) => { setDescription(e.target.value)
                    // const newDescription = e.target.value;
                    // setDescription(newDescription);  // Update state
                    // updateDescription({
                    //     _id: question._id,
                    //     description: newDescription,
                    // });
                }}
                />
            <br/>
            <h5>Answers:</h5>


        </div>
        
        );
}