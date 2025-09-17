export default function AssignmentEditor() {
  return (
    <div id='wd-assignments-editor'>
      <label htmlFor='wd-name'>Assignment Name</label>
      <input id='wd-name' value='A1 - ENV + HTML' />
      <br />
      <br />
      <textarea id='wd-description' cols={50} rows={10}>
        The assignment is available online Submit a link to the landing page of
        your Web application running on Netlify. The landing page should include
        the following: Your full name and section Links to each of the lab
        assignments Link to the Kanbas application Links to all relevant source
        code repositories The Kambaz application should include a link to
        navigate back to the landing page.
      </textarea>
      <br />
      <br />
      <table>
        <tbody>
          <tr>
            <td align='right' valign='top'>
              <label htmlFor='wd-points'>Points</label>
            </td>
            <td>
              <input id='wd-points' value={100} />
            </td>
          </tr>
          <tr>
            <td align='right' valign='top'>
              <label htmlFor='wd-group'>Assignment Group</label>
            </td>
            <td>
              <select id='wd-group'>
                <option selected value='ASSIGNMENTS'>
                  ASSIGNMENTS
                </option>
              </select>
            </td>
          </tr>
          <tr>
            <td align='right' valign='top'>
              <label htmlFor='wd-display-grade-as'>Display Grade as</label>
            </td>
            <td>
              <select id='wd-display-grade-as'>
                <option selected value='PERCENTAGE'>
                  Percentage
                </option>
              </select>
            </td>
          </tr>
          <tr>
            <td align='right' valign='top'>
              <label htmlFor='wd-submission-type'>Submission Type</label>
            </td>
            <td>
              <select id='wd-submission-type'>
                <option selected value='ONLINE'>
                  Online
                </option>
              </select>
              <br />
              <br />
              <strong>Online Entry Options</strong>
              <div>
                <input
                  type='checkbox'
                  name='online-options'
                  id='wd-text-entry'
                />
                <label htmlFor='wd-text-entry'>Text Entry</label>
              </div>
              <div>
                <input
                  type='checkbox'
                  name='online-options'
                  id='wd-website-url'
                />
                <label htmlFor='wd-website-url'>Website URL</label>
              </div>
              <div>
                <input
                  type='checkbox'
                  name='online-options'
                  id='wd-media-recordings'
                />
                <label htmlFor='wd-media-recordings'>Media Recordings</label>
              </div>
              <div>
                <input
                  type='checkbox'
                  name='online-options'
                  id='wd-student-annotation'
                />
                <label htmlFor='wd-student-annotation'>
                  Student Annotation
                </label>
              </div>
              <div>
                <input
                  type='checkbox'
                  name='online-options'
                  id='wd-file-upload'
                />
                <label htmlFor='wd-file-upload'>File Uploads</label>
              </div>
            </td>
          </tr>
          <tr>
            <td align='right' valign='top'>
              <label htmlFor='wd-assign-to'>Assign to</label>
            </td>
            <td>
              <input id='wd-assign-to' value='Everyone' />
            </td>
          </tr>
          <tr>
            <td align='right' valign='top'>
              <label htmlFor='wd-due-date'>Due</label>
            </td>
            <td>
              <input type='date' id='wd-due-date' value='2024-05-13' />
            </td>
          </tr>
          <tr>
            <td align='right' valign='top'></td>
            <td>
              <div style={{ display: 'flex', gap: '20px' }}>
                <div>
                  <label htmlFor='wd-available-from'>
                    <strong>Available from</strong>
                  </label>
                  <br />
                  <input
                    type='date'
                    id='wd-available-from'
                    value='2024-05-06'
                  />
                </div>
                <div>
                  <label htmlFor='wd-available-until'>
                    <strong>Until</strong>
                  </label>
                  <br />
                  <input
                    type='date'
                    id='wd-available-until'
                    value='2024-05-20'
                  />
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <td colSpan={2}>
              <hr />
            </td>
          </tr>
          <tr>
            <td colSpan={2} align='right'>
              <button>Cancel</button> <button>Save</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
