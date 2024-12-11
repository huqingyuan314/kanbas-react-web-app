import { useState } from 'react';
import SimpleWysiwyg from 'react-simple-wysiwyg';

export default function FillBlankQuestionEditor() {


    const [description, setDescription] = useState("");

    return (
<div>

<h6 className="text-secondary">Enter your question text, then define all possible correct answers for the blank. </h6>
<h6 className="text-secondary">Students will see the question followed by a small text box to type their answer. </h6>
            <h5>Question:</h5>

            <SimpleWysiwyg
                value={description} onChange={(e) => setDescription(e.target.value)}
                />






</div>
        );
}