// export default function AssignmentEditor() {
//     return (
//       <div id="wd-assignments-editor">

//         <label htmlFor="wd-name"><h3>Assignment Name</h3></label>
//         <input id="wd-name" value="A1 - ENV + HTML" /><br /><br />

//         <textarea id="wd-description" cols={40} rows={10}>
//           The assignment is available online submit alink to the landing page of your Webapplication running on Netlify. The landingpage should include the following: Your fullname and section Links to each of the labassignments Link to the Kanbas applicationLinks to all relevant source code repositoriesThe Kanbas application should include a linkto navigate back to the landing page.
//         </textarea>
//         <br />
//         <br />

//         <table>
//           <tr>
//             <td align="right" valign="top">
//               <label htmlFor="wd-points">Points</label>
//             </td>
//             <td>
//               <input id="wd-points" defaultValue={100} />
//             </td>
//           </tr>
//           <br />

//           {/* Complete on your own */}
//           <tr>
//             <td align="right" valign="top">
//               <label htmlFor="wd-group">Assignment Group</label>
//             </td>
//             <td>
//             <select id="wd-group">
//                 <option selected value="ASSIGNMENTS">ASSIGNMENTS</option>
//                 <option value="QUIZZES">QUIZZES</option>
//                 <option value="EXAMS">EXAMS</option>
//                 <option value="PROJECT">PROJECT</option>
//             </select>
//             </td>
//           </tr>
//           <br />

//           <tr>
//             <td align="right" valign="top">
//               <label htmlFor="wd-display-grade-as">Display Grade as</label>
//             </td>
//             <td>
//             <select id="wd-display-grade-as">
//                 <option selected value="PERCENTAGE">Percentage</option>
//                 <option value="SCORE">Score</option>
//                 <option value="LETTER">Letter Grade</option>
//                 <option value="PASS">Pass / Not Pass</option>
//             </select>
//             </td>
//           </tr>
//           <br />

//           <tr>
//             <td align="right" valign="top">
//               <label htmlFor="wd-submission-type">Submission Type</label>
//             </td>
//             <td>
//             <select id="wd-submission-type">
//                 <option selected value="ONLINE">Online</option>
//                 <option value="ON PAPER">On Paper</option>
//                 <option value="EXTERNAL TOOL">External Tool</option>
//                 <option value="NO SUBMISSION">No Submission</option>
//             </select>
//             </td>


            
//           </tr>
//           <br />

//         <tr>
//         <td></td>
//         <td align="right" valign="top">
//         <label>Online Entry Options</label>
//         </td>
//         <br/>
//         </tr>

//         <tr>
//         <td></td>
//         <input type="checkbox" name="check-entry" id="wd-text-entry"/>
//         <label htmlFor="wd-text-entry">Text Entry</label><br/>

//         <input type="checkbox" name="check-entry" id="wd-website-url"/>
//         <label htmlFor="wd-website-url">Website URL</label><br/>

//         <input type="checkbox" name="check-entry" id="wd-media-recordings"/>
//         <label htmlFor="wd-media-recordings">Media Recordings</label><br/>

//         <input type="checkbox" name="check-entry" id="wd-student-annotation"/>
//         <label htmlFor="wd-student-annotation">Student Annotation</label><br/>

//         <input type="checkbox" name="check-entry" id="wd-file-upload"/>
//         <label htmlFor="wd-file-upload">File Uploads</label><br/>
//         </tr>
//         <br/>


//           <tr>
//             <td align="right" valign="top">
//               <label htmlFor="wd-assign-to">Assign</label>
//             </td>
//             <td align="left" valign="top">
//               <label htmlFor="wd-assign-to">Assign to</label>
//             </td>
//           </tr>

//           <tr>
//             <td></td>
//             <td>
//               <input id="wd-assign-to" defaultValue="Everyone" />
//             </td>
//           </tr>
//           <br />

//         <tr>
//         <td></td>
//           <label htmlFor="wd-due-date"> Due </label>
            
//         </tr>

//         <tr>
//         <td></td>
//         <input type="date"
//             id="wd-due-date"
//             defaultValue="2024-05-13"/>
//         </tr>
//         <br/>

//       <tr>
//       <td></td>
//         <td align="left" valign="top">
//           <label htmlFor="wd-available-from"> Available from </label>
//           </td>
//           <td align="left" valign="top">
//           <label htmlFor="wd-available-until"> Until </label>
//           </td>
//           <br/>
//         </tr>

//         <tr>
//         <td></td>
//         <td align="left" valign="top">
//         <input type="date"
//       id="wd-available-from"
//       defaultValue="2024-05-06"/>
//         </td>
//         <td align="left" valign="top">
//         <input type="date"
//       id="wd-available-until"
//       defaultValue="2024-05-20"/>
//         </td>
//       </tr>
//       <br/>


//         </table>

//         <hr />



// <div className="float-end">
//     <button id="wd-cancel-btn" className="btn btn-lg btn-secondary me-2">
//     Cancel</button>

//     <button type="submit" id="wd-save-btn" className="btn btn-lg btn-danger me-2 p-2">
//         Save</button>
// </div>


// </div>
//   );}
  
  











  import 'bootstrap/dist/css/bootstrap.min.css';

export default function AssignmentEditor() {
    return (
      <div id="wd-assignments-editor" className="container mt-4">
        <div className="row mb-4">
          <div className="col">
            <h3>Assignment Name</h3>
            <input id="wd-name" value="A1 - ENV + HTML" className="form-control" />
          </div>
        </div>

        <div className="row mb-4">
          <div className="col">
            <textarea id="wd-description" className="form-control" rows={5}>
              The assignment is available online. Submit a link to the landing page of your Web application running on Netlify.
              The landing page should include the following: Your full name and section, Links to each of the lab assignments,
              Link to the Kanbas application, Links to all relevant source code repositories.
              The Kanbas application should include a link to navigate back to the landing page.
            </textarea>
          </div>
        </div>

        <div className="row mb-4">
          <div className="col-6">
            <label htmlFor="wd-points">Points</label>
            <input id="wd-points" defaultValue={100} className="form-control" />
          </div>
          <div className="col-6">
            <label htmlFor="wd-group">Assignment Group</label>
            <select id="wd-group" className="form-control">
              <option value="ASSIGNMENTS" selected>ASSIGNMENTS</option>
              <option value="QUIZZES">QUIZZES</option>
              <option value="EXAMS">EXAMS</option>
              <option value="PROJECT">PROJECT</option>
            </select>
          </div>
        </div>

        <div className="row mb-4">
          <div className="col-6">
            <label htmlFor="wd-display-grade-as">Display Grade as</label>
            <select id="wd-display-grade-as" className="form-control">
              <option value="PERCENTAGE" selected>Percentage</option>
              <option value="SCORE">Score</option>
              <option value="LETTER">Letter Grade</option>
              <option value="PASS">Pass / Not Pass</option>
            </select>
          </div>
          <div className="col-6">
            <label htmlFor="wd-submission-type">Submission Type</label>
            <select id="wd-submission-type" className="form-control">
              <option value="ONLINE" selected>Online</option>
              <option value="ON PAPER">On Paper</option>
              <option value="EXTERNAL TOOL">External Tool</option>
              <option value="NO SUBMISSION">No Submission</option>
            </select>
          </div>
        </div>

        <div className="row mb-4">
          <div className="col-12">
            <label>Online Entry Options</label>
            <div>
              <input type="checkbox" id="wd-text-entry" /> <label htmlFor="wd-text-entry">Text Entry</label><br />
              <input type="checkbox" id="wd-website-url" /> <label htmlFor="wd-website-url">Website URL</label><br />
              <input type="checkbox" id="wd-media-recordings" /> <label htmlFor="wd-media-recordings">Media Recordings</label><br />
              <input type="checkbox" id="wd-student-annotation" /> <label htmlFor="wd-student-annotation">Student Annotation</label><br />
              <input type="checkbox" id="wd-file-upload" /> <label htmlFor="wd-file-upload">File Uploads</label>
            </div>
          </div>
        </div>

        <div className="row mb-4">
          <div className="col-6">
            <label htmlFor="wd-assign-to">Assign to</label>
            <input id="wd-assign-to" defaultValue="Everyone" className="form-control" />
          </div>
          <div className="col-6">
            <label htmlFor="wd-due-date">Due</label>
            <input type="date" id="wd-due-date" defaultValue="2024-05-13" className="form-control" />
          </div>
        </div>

        <div className="row mb-4">
          <div className="col-6">
            <label htmlFor="wd-available-from">Available from</label>
            <input type="date" id="wd-available-from" defaultValue="2024-05-06" className="form-control" />
          </div>
          <div className="col-6">
            <label htmlFor="wd-available-until">Until</label>
            <input type="date" id="wd-available-until" defaultValue="2024-05-20" className="form-control" />
          </div>
        </div>

        <div className="float-end">
          <button id="wd-cancel-btn" className="btn btn-lg btn-secondary me-2">Cancel</button>
          <button type="submit" id="wd-save-btn" className="btn btn-lg btn-danger">Save</button>
        </div>
      </div>
    );
}