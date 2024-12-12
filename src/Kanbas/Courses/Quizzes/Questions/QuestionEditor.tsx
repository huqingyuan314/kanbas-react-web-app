import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as questionsClient from "./client";
import { updateQuestion } from "./reducer";
import { wait } from "@testing-library/user-event/dist/utils";
import SimpleWysiwyg from 'react-simple-wysiwyg';
import { FaTrash } from "react-icons/fa";

export default function QuestionEditor( ) {

    const { cid, qid, quid } = useParams();
    const navigate = useNavigate(); // Use navigate hook
    const dispatch = useDispatch();

    const questions = useSelector((state: any) => state.questionsReducer.questions);
    const question = questions.find((question: any) => question._id === quid);
    
    const [title, setTitle] = useState("");
    const [questionType, setQuestionType] = useState("");
    const [points, setPoints] = useState("");
    const [description, setDescription] = useState("");

    const [choices, setChoices] = useState([{text: '', correct: false}]);
    const [trueFalse, setTrueFalse,] = useState<any>({});
    const [blanks, setBlanks] = useState<string[]>([]);
    const [newAnswer, setNewAnswer] = useState("");

    useEffect(() => {
        if (question) {
          setTitle(question.title);
          setQuestionType(question.questionType);
          setPoints(question.points);
          setDescription(question.description);

          setChoices(question.choices.map((choice: any) => ({
            text: choice,
            correct: choice === question.choicesAnswer
        })));

          setTrueFalse(question.trueFalse);

          if (question.blanks) {
            setBlanks(question.blanks);
        }

        }
      }, [question]); 


      const handleChoiceChange = (index: number, newText: string) => {
        const updatedChoices = choices.map((choice, i) => 
            i === index ? {...choice, text: newText} : choice
        );
        setChoices(updatedChoices);
    };

    const handleChoiceToggle = (index: number) => {
        const updatedChoices = choices.map((choice, i) => ({
            ...choice,
            correct: i === index
        }));
        setChoices(updatedChoices);
    };

    const addChoice = () => {
        setChoices([...choices, { text: '', correct: false }]);
    };

    const removeChoice = (index: number) => {
        setChoices(choices.filter((_, i) => i !== index));
    };


    const handleAddAnswer = () => {
        if (newAnswer.trim() !== "") {
            setBlanks(prev => [...prev, newAnswer.trim()]);
            setNewAnswer(""); // Clear input after adding
        }
    };

    const handleRemoveAnswer = (index: any) => {
        setBlanks(prev => prev.filter((_, idx) => idx !== index));
    };

    const handleInputChange = (event: any) => {
        setNewAnswer(event.target.value);
    };


    

      const updateQuestionType = async (updatedQuestion: any) => {
        try {
          await questionsClient.updateQuestion(updatedQuestion); // API call
          dispatch(updateQuestion(updatedQuestion)); // Update Redux state
        } catch (error) {
          console.error("Error updating questionType:", error);
        }
      };


      const saveQuestion = async (updatedQuestion: any) => {
        try {
          await questionsClient.updateQuestion(updatedQuestion); // API call
          dispatch(updateQuestion(updatedQuestion)); // Update Redux state
          navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}/QuizEditor/QuizQuestionsEditor`); // Navigate back to quizzes
        } catch (error) {
          console.error("Error updating question:", error);
        }
      };


      function determineInstruction(question: { questionType: String; }) {
    
        if ( question.questionType === "MULTIPLE-CHOICE" ) {
            return <h6 className="text-secondary">Enter your question and multiple answers, then select the one correct answer. </h6>
        } else if (question.questionType === "TRUE-FALSE") {
            return <h6 className="text-secondary">Enter your question text, then select if True or False is the correct answer. </h6>
        } else if (question.questionType === "FILL-BLANK") {
            return (<div>
            <h6 className="text-secondary">Enter your question text, then define all possible correct answers for the blank. </h6>
            <h6 className="text-secondary">Students will see the question followed by a small text box to type their answer. </h6>
            </div>)
        } else {
            return
        }
    }


    function determineAnswers(question: { questionType: String; }) {
    
        if ( question.questionType === "MULTIPLE-CHOICE" ) {
            return (
<div id="wd-multiple-choice-selector">
  <form>
    <div>
                {choices.map((choice, index) => (
                    <div key={index} className="form-check mb-2 d-flex align-items-center col">
                        <input
                            className="form-check-input ms-2 me-3"
                            type="radio"
                            name="correctAnswer"
                            checked={choice.correct}
                            onChange={() => handleChoiceToggle(index)}
                        />
                        <label className={`form-check-label col-2 ${choice.correct ? "text-success" : ""}`} 
                        htmlFor="null">
                        {choice.correct ? "Correct Answer" : "Possible Answer"} </label>

                        <input
                            type="text"
                            value={choice.text}
                            onChange={e => handleChoiceChange(index, e.target.value)}
                            className="form-control me-3"
                        />
                        
                        <FaTrash onClick={() => removeChoice(index)}
                          className="me-4 fs-5 text-danger col-1" />
                    </div>
                ))}

                <button type="button" onClick={addChoice} 
                className="btn btn-clear text-danger">+ Add Another Answer</button>
            </div>

  </form>
</div>
            )
        
        
        } else if (question.questionType === "TRUE-FALSE") {
            return (
<div id="wd-true-false-selector">

<div className="form-check d-flex align-items-center col">
    <div className="me-4" />
  <input
    className="form-check-input me-2" 
    type="radio"
    name="trueFalseAnswer"
    id="trueOption"
    checked={trueFalse}
    onChange={() => setTrueFalse(true)}
  />
  <label className={`form-check-label col-2 ${trueFalse ? "text-success" : ""}`}
  htmlFor="trueOption">
    True
  </label>
</div>
<div className="form-check d-flex align-items-center col">
<div className="me-4" />
  <input
    className="form-check-input me-2"
    type="radio"
    name="trueFalseAnswer"
    id="falseOption"
    checked={!trueFalse}
    onChange={() => setTrueFalse(false)}
  />
  <label className={`form-check-label col-2 ${trueFalse ? "" : "text-success"}`}
   htmlFor="falseOption">
    False
  </label>
</div>

</div>

            )
        
        
        } else if (question.questionType === "FILL-BLANK") {
            return (
                <div className="fill-in-the-blank-editor">
                <div className="input-group mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter a possible answer"
                        value={newAnswer}
                        onChange={handleInputChange}
                    />
                    <button className="btn btn-outline-secondary" type="button" onClick={handleAddAnswer}>
                        Add Answer
                    </button>
                </div>
    
                <ul className="list-group">
                    {blanks.map((answer, index) => (
                        <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                            <label className={`form-check-label col-3`} 
                        htmlFor="index">
                        Possible Answer: </label>
                            
                            {answer}

                            <FaTrash onClick={() => handleRemoveAnswer(index)}
                          className="me-4 fs-5 text-danger" />
                        </li>
                    ))}
                </ul>

            </div>
                
                            )
        
    
        } else {
            return
        }
    }


    //////////////////////////////////////////////////////////////////////////////////////////

    
    return (
        <div id="wd-questions-editor" className="container mt-4"
            style={{width: "80%", margin: "0 auto"}}>

        <div className="row mb-4">

          <div className="col">
            <input id="wd-question-name col-4" defaultValue={question && question.title} 
            placeholder="Question Title"
            onChange={(e) => setTitle(e.target.value)}
            className="form-control" />
          </div>

          <div className="col-4 d-flex justify-content-end align-items-center">
            <select id="wd-question-type" className="form-select"
             defaultValue={question.questionType}
             onChange={(e) => {
                const newQuestionType = e.target.value;
                setQuestionType(newQuestionType);  // Update state
                updateQuestionType({
                    _id: question._id,
                    title,
                    questionType: newQuestionType,  // Send the new value directly
                    points,
                    description,
                    choices: choices.map(choice => choice.text),
                    choicesAnswer: choices.find(choice => choice.correct)?.text || '',
                    trueFalse,
                    blanks,
                });
            }} >
              <option value="MULTIPLE-CHOICE">Multiple Choice</option>
              <option value="TRUE-FALSE">True / False</option>
              <option value="FILL-BLANK" >Fill In the Blank</option>
            </select>
          </div>

          <div className="col-2 d-flex justify-content-end align-items-center">
            <label htmlFor="wd-question-points">Pts:</label>
          </div>
          <div className="col-2 d-flex justify-content-end align-items-center">
            <input id="wd-question-points" defaultValue={question && question.points} 
            type="number" onChange={(e) => setPoints(e.target.value)}
            className="form-control" />
          </div>

        </div>



<hr />

        <div>
            {determineInstruction(question)}
            <h5>Question:</h5>

            <SimpleWysiwyg
                value={description} onChange={(e) => { setDescription(e.target.value) }}
                />
            <br/>
            <h5>Answers:</h5>

            {determineAnswers(question)}


        </div>

<hr />

<div className="float-end">

<Link id="wd-question-editor-cancel-btn"
    to={`/Kanbas/Courses/${cid}/Quizzes/${qid}/QuizEditor/QuizQuestionsEditor`}
    className="btn btn-lg btn-secondary me-3">
    Cancel </Link>

  <button
  id="wd-question-editor-save-btn"
  type="button"
  onClick={
    () => 
        saveQuestion({
          _id: question._id,
          title,
          questionType,
          points,
          description,
          choices: choices.map(choice => choice.text),
          choicesAnswer: choices.find(choice => choice.correct)?.text || '',
          trueFalse,
          blanks,
        })
  }
  className="btn btn-lg btn-danger me-3"
>
  Update Question
</button>

</div>


</div>
        );
        
}