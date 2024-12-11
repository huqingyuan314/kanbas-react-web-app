import { useState } from 'react';
import SimpleWysiwyg from 'react-simple-wysiwyg';

export default function TrueFalseQuestionEditor() {

    const [description, setDescription] = useState("");



    return (
        <div>

        <h6 className="text-secondary">Enter your question text, then select if True or False is the correct answer. </h6>
            <h5>Question:</h5>

            <SimpleWysiwyg
                value={description} onChange={(e) => setDescription(e.target.value)}
                />


                    {/* <div className="row mb-4 justify-content-end">
      <div className="col-4 d-flex justify-content-end align-items-center">
        <label htmlFor="wd-quiz-type">Quiz Type</label>
      </div>
      <div className="col-8 d-flex justify-content-end align-items-center">
        <select id="wd-quiz-type" className="form-select"
         defaultValue={quiz.quizType}
        onChange={(e) => setQuizType(e.target.value)} >
          <option value="GRADED-QUIZ">Graded Quiz</option>
          <option value="PRACTICE-QUIZ">Practice Quiz</option>
          <option value="GRADED-SURVEY">Graded Survey</option>
          <option value="UNGRADED-SURVEY">Ungraded Survey</option>
        </select>
      </div>
      </div> */}

    </div>
    
    );
}