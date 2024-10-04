import 'bootstrap/dist/css/bootstrap.min.css';

export default function AssignmentEditor() {
    return (
      <div id="wd-assignments-editor" className="container mt-4">

        <div className="row mb-4">
          <div className="col">
            <h3>Assignment Name</h3>
            <input id="wd-name" defaultValue="A1 - ENV + HTML" className="form-control" />
          </div>
        </div>

        <div className="row mb-4">
          <div className="col">
            <textarea id="wd-description" className="form-control" rows={10}>
              The assignment is available online. Submit a link to the landing page of your Web application running on Netlify.
              The landing page should include the following: Your full name and section, Links to each of the lab assignments,
              Link to the Kanbas application, Links to all relevant source code repositories.
              The Kanbas application should include a link to navigate back to the landing page.
            </textarea>
          </div>
        </div>



        <div className="row mb-4 justify-content-end">
          <div className="col-4 d-flex justify-content-end align-items-center">
            <label htmlFor="wd-points">Points</label>
          </div>
          <div className="col-8 d-flex justify-content-end align-items-center">
            <input id="wd-points" defaultValue={100} className="form-control" />
          </div>
          </div>

          <div className="row mb-4 justify-content-end">
          <div className="col-4 d-flex justify-content-end align-items-center">
            <label htmlFor="wd-group">Assignment Group</label>
          </div>
          <div className="col-8 d-flex justify-content-end align-items-center">
            <select id="wd-group" className="form-control">
              <option value="ASSIGNMENTS" selected>ASSIGNMENTS</option>
              <option value="QUIZZES">QUIZZES</option>
              <option value="EXAMS">EXAMS</option>
              <option value="PROJECT">PROJECT</option>
            </select>
          </div>
        </div>

        <div className="row mb-4 justify-content-end">
          <div className="col-4 d-flex justify-content-end align-items-center">
            <label htmlFor="wd-display-grade-as">Display Grade as</label>
          </div>
          <div className="col-8 d-flex justify-content-end align-items-center">
            <select id="wd-display-grade-as" className="form-control">
              <option value="PERCENTAGE" selected>Percentage</option>
              <option value="SCORE">Score</option>
              <option value="LETTER">Letter Grade</option>
              <option value="PASS">Pass / Not Pass</option>
            </select>
          </div>
          </div>



  {/* Submission Type */}
<div className="row mb-4 align-items-top">

  <div className="col-4 text-end">
    <label htmlFor="wd-submission-type" className="col-form-label">Submission Type</label>
  </div>

  <div className="col-8 border rounded p-3">
  <div className="col">
    <select id="wd-submission-type" className="form-control">
      <option value="ONLINE" selected>Online</option>
      <option value="ON PAPER">On Paper</option>
      <option value="EXTERNAL TOOL">External Tool</option>
      <option value="NO SUBMISSION">No Submission</option>
    </select>
  </div>


  {/* Online Entry Options */}
  <div className="col-4 text-end">
  </div>
  <div className="col-8">
  <label htmlFor="wd-online-entry-options" className="col-form-label"><b>Online Entry Options</b></label>
    <div className="form-check">
      <input className="form-check-input" type="checkbox" id="wd-text-entry" />
      <label className="form-check-label" htmlFor="wd-text-entry">Text Entry</label><br />
      
      <input className="form-check-input" type="checkbox" id="wd-website-url" />
      <label className="form-check-label" htmlFor="wd-website-url">Website URL</label><br />
      
      <input className="form-check-input" type="checkbox" id="wd-media-recordings" />
      <label className="form-check-label" htmlFor="wd-media-recordings">Media Recordings</label><br />
      
      <input className="form-check-input" type="checkbox" id="wd-student-annotation" />
      <label className="form-check-label" htmlFor="wd-student-annotation">Student Annotation</label><br />
      
      <input className="form-check-input" type="checkbox" id="wd-file-upload" />
      <label className="form-check-label" htmlFor="wd-file-upload">File Uploads</label>
    </div>
  </div>
  </div>

</div>



{/* Assign */}
<div className="row mb-4 align-items-top">
  <div className="col-4 text-end">
    <label htmlFor="wd-assign" className="col-form-label">Assign</label>
  </div>

  <div className="col-8 border rounded p-3">

  <label htmlFor="wd-assign-to" className="col-form-label"><b>Assign to</b></label>
    <input id="wd-assign-to" defaultValue="Everyone" className="form-control" />

    <label htmlFor="wd-due-date" className="col-form-label">Due</label>
    <input type="date" id="wd-due-date" defaultValue="2024-05-13" className="form-control" />


    <div className="row">
      <div className="col">
        <label htmlFor="wd-available-from" className="col-form-label">Available from</label>
        <input type="date" id="wd-available-from" defaultValue="2024-05-06" className="form-control" />
      </div>
      <div className="col">
        <label htmlFor="wd-available-until" className="col-form-label">Until</label>
        <input type="date" id="wd-available-until" defaultValue="2024-05-20" className="form-control" />
      </div>
    </div>
  </div>
</div>



<hr />

        <div className="float-end">
          <button id="wd-cancel-btn" className="btn btn-lg btn-secondary me-2">Cancel</button>
          <button type="submit" id="wd-save-btn" className="btn btn-lg btn-danger">Save</button>
        </div>
      </div>
    );
}