export default function AssignmentEditor() {
    return (
      <div id="wd-assignments-editor">

        <label htmlFor="wd-name">Assignment Name</label>
        <input id="wd-name" value="A1 - ENV + HTML" /><br /><br />

        <textarea id="wd-description" cols={40} rows={10}>
          The assignment is available online submit alink to the landing page of your Webapplication running on Netlify. The landingpage should include the following: Your fullname and section Links to each of the labassignments Link to the Kanbas applicationLinks to all relevant source code repositoriesThe Kanbas application should include a linkto navigate back to the landing page.
        </textarea>
        <br />
        <br />

        <table>
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-points">Points</label>
            </td>
            <td>
              <input id="wd-points" defaultValue={100} />
            </td>
          </tr>
          <br />

          {/* Complete on your own */}
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-group">Assignment Group</label>
            </td>
            <td>
            <select id="wd-group">
                <option selected value="ASSIGNMENTS">ASSIGNMENTS</option>
                <option value="QUIZZES">QUIZZES</option>
                <option value="EXAMS">EXAMS</option>
                <option value="PROJECT">PROJECT</option>
            </select>
            </td>
          </tr>
          <br />

          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-display-grade-as">Display Grade as</label>
            </td>
            <td>
            <select id="wd-display-grade-as">
                <option selected value="PERCENTAGE">Percentage</option>
                <option value="SCORE">Score</option>
                <option value="LETTER">Letter Grade</option>
                <option value="PASS">Pass / Not Pass</option>
            </select>
            </td>
          </tr>
          <br />

          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-submission-type">submission Type</label>
            </td>
            <td>
            <select id="wd-submission-type">
                <option selected value="ONLINE">Online</option>
                <option value="ON PAPER">On Paper</option>
                <option value="EXTERNAL TOOL">External Tool</option>
                <option value="NO SUBMISSION">No Submission</option>
            </select>
            </td>


            
          </tr>
          <br />

        <tr>
        <td align="right" valign="top">
        <label>Online Entry Options</label>
        </td>
        <br/>

        <input type="checkbox" name="check-entry" id="wd-text-entry"/>
        <label htmlFor="wd-text-entry">Text Entry</label><br/>

        <input type="checkbox" name="check-entry" id="wd-website-url"/>
        <label htmlFor="wd-website-url">Website URL</label><br/>

        <input type="checkbox" name="check-entry" id="wd-media-recordings"/>
        <label htmlFor="wd-media-recordings">Media Recordings</label><br/>

        <input type="checkbox" name="check-entry" id="wd-student-annotation"/>
        <label htmlFor="wd-student-annotation">Student Annotation</label><br/>

        <input type="checkbox" name="check-entry" id="wd-file-upload"/>
        <label htmlFor="wd-file-upload">File Uploads</label><br/>
        </tr>
        <br/>


          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-assign-to">Assign Assign to</label>
            </td>
            <td>
              <input id="wd-assign-to" defaultValue="Everyone" />
            </td>
          </tr>
          <br />

        <tr>
          <label htmlFor="wd-due-date"> Due </label>
        <input type="date"
      id="wd-due-date"
      defaultValue="2024-05-13"/>
      </tr>
      <br/>

      <tr>
          <label htmlFor="wd-available-from"> Available from </label>
          <label htmlFor="wd-available-until"> Until </label>
          <br/>

        <input type="date"
      id="wd-available-from"
      defaultValue="2024-05-06"/>

        <input type="date"
      id="wd-available-until"
      defaultValue="2024-05-20"/>
      </tr>
      <br/>


        </table>

        <button id="wd-cancel">Cancel</button>
        <button id="wd-save">Save</button>
      </div>
  );}
  
  