import "../../css/Attendance.css";

const Attendance = () => {
  return (
    <div className="attendance-container">
      <h3 className="attendance-title">Attendance</h3>
      <p className="month-year">&lt; Month year &gt;</p>
      <div className="attendance-table-wrapper">
        <table className="attendance-table">
          <thead>
            <tr>
              <th>Monday</th>
              <th>TuesDay</th>
              <th>WednesDay</th>
              <th>ThursDay</th>
              <th>FriDay</th>
              <th>SaturDay</th>
              <th>SunDay</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td></td>
              <td></td>
              <td>1</td>
              <td>2</td>
              <td>3</td>
              <td>4</td>
              <td>5</td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td className="absent">A</td>
              <td className="present">P</td>
              <td className="absent">A</td>
              <td className="present">P</td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Attendance;
