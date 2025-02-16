
import "../../../css/Attenancetable.css"

function AttendanceTable() {
  return (
    <div className="attendance-section">
      <div className="attendance-header">
        <input type="date" className="date-input" />
        <span className="trainer-name">Trainer Name</span>
      </div>
      <table className="attendance-table">
        <thead>
          <tr>
            <th>Member Name</th>
            <th>Membership type</th>
            <th>Attendance</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>John show</td>
            <td>Premium</td>
            <td>
              <span className="attendance-status absent">Absent</span>
            </td>
          </tr>
          {/* Add more rows as needed */}
        </tbody>
      </table>
    </div>
  )
}

export default AttendanceTable

