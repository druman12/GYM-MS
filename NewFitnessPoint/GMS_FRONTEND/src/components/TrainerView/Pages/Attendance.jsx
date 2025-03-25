import "../../../css/Attendance.css";
import TrainerHeader from "../TrainerHeader";
import Sidebar from "../SideBar";
import { useState, useEffect } from "react";

function Attendance() {
  const [isAbsent, setIsAbsent] = useState({});
  const [currentDate, setCurrentDate] = useState("");
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const URL = "http://127.0.0.1:8000/api/attendance/today/";

  const [trainer, setTrainer] = useState("");
  const trainer_id = sessionStorage.getItem("userId");
  const url = `http://127.0.0.1:8000/api/trainer/${trainer_id}/`;

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setCurrentDate(today);
    fetch(url)
      .then((response) => response.json())
      .then((data) => setTrainer(data))
      .catch((error) => console.error("Error fetching trainer data:", error));
  }, [url]);

  useEffect(() => {
    setLoading(true);
    fetch(URL)
      .then((response) => response.json())
      .then((data) => {
        // Initialize isAbsent state based on members' today_attendance
        const initialAbsentStatus = data.members.reduce((acc, member) => {
          acc[member.member_id] = member.today_attendance === "absent";
          return acc;
        }, {});
        
        setMembers(data.members);
        setIsAbsent(initialAbsentStatus);
      })
      .catch((error) => console.error("Error fetching trainer data:", error))
      .finally(() => setLoading(false));
  }, [refresh]);
  
  const markAttendance = async (memberId, trainerId, currentStatus) => {
    const payload = {
      member_id: memberId,
      trainer_id: trainerId,
      attendance: currentStatus ? "present" : "absent",
    };
  
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/attendance/make/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );  
      if (response.ok) {
        setIsAbsent((prevState) => ({
          ...prevState,
          [memberId]: !prevState[memberId],
        }));
        setRefresh((prev) => !prev);
      } else {
        console.error("Failed to mark attendance:", response.statusText);
      }
    } catch (error) {
      console.error("Error sending attendance data:", error);
    }
  };
  
  if(loading){
    return <h1>Loading...</h1>
  }

  return (
    <div className="attendance-container">
      <div className="attendance-content">
        <Sidebar />
        <div className="attendance-main">
          <TrainerHeader />
          <h2 className="attendance-title">Mark Attendance</h2>
          <div className="attendance-header">
            <span className="date-placeholder">{currentDate}</span>
            <span className="trainer-name">{trainer.name}</span>
          </div>
          <div className="attendance-table-wrapper">
            <table className="attendance-table">
              <thead>
                <tr>
                  <th>Member Name</th>
                  <th>Joining Date</th>
                  <th>Subscription End</th>
                  <th>Attendance</th>
                </tr>
              </thead>
              <tbody>
                {members.length > 0 ? (
                  members.map((member) => (
                    <tr key={member.member_id}>
                      <td>{member.name}</td>
                      <td>{member.joining_date}</td>
                      <td>{member.subscription_end_date}</td>
                      <td>
                        <button
                          className={`attendance-status ${isAbsent[member.member_id] ? "absent" : "present"}`}
                          onClick={() =>
                            markAttendance(
                              member.member_id,
                              trainer_id,
                              isAbsent[member.member_id]
                            )
                          }
                        >
                          {isAbsent[member.member_id] ? "Absent" : "Present"}
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4">No members found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Attendance;