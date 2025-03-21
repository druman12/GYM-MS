// 



import "../../../css/Attendance.css";
import TrainerHeader from "../TrainerHeader";
import Sidebar from "../SideBar";
import { useState, useEffect } from "react";

function Attendance() {
    const [attendance, setAttendance] = useState([]);
    const [isAbsent, setIsAbsent] = useState({});
    const [currentDate, setCurrentDate] = useState("");

    const url1 = `http://127.0.0.1:8000/api/member/`;

    const [trainer, setTrainer] = useState("");
    const trainer_id=sessionStorage.getItem("userId");
    const url=`http://127.0.0.1:8000/api/trainer/${trainer_id}/`
    
      useEffect(() => {
        fetch(url)  // Replace with your actual API URL
          .then(response => response.json())
          .then(data => setTrainer(data))
          .catch(error => console.error('Error fetching trainer data:', error));
      }, [url]);

    useEffect(() => {
        fetch(url1)
            .then((response) => response.json())
            .then((data) => {
                setAttendance(data);
                const initialStatus = data.reduce((acc, member) => {
                    acc[member.member_id] = true;
                    return acc;
                }, {});
                setIsAbsent(initialStatus);
            })
            .catch((error) => console.error("Error fetching Attendance data:", error));

        const today = new Date().toISOString().split("T")[0];
        setCurrentDate(today);
    }, []);

    // Function to send attendance data to API
    const markAttendance = async (memberId, trainerId, status) => {
        const payload = {
            member_id: memberId,
            trainer_id: trainerId, // Replace with actual trainer ID if dynamic
            attendance: status ? "absent" : "present",
        };

        try {
            const response = await fetch("http://127.0.0.1:8000/api/attendance/make/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                console.log(`Attendance marked for Member ID: ${memberId} as ${payload.attendance}`);
                setIsAbsent((prevState) => ({
                    ...prevState,
                    [memberId]: !status, // Toggle attendance status
                }));
            } else {
                console.error("Failed to mark attendance:", response.statusText);
            }
        } catch (error) {
            console.error("Error sending attendance data:", error);
        }
    };

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
                                    <th>Membership Type</th>
                                    <th>Attendance</th>
                                </tr>
                            </thead>
                            <tbody>
                                {attendance.length > 0 ? (
                                    attendance.map((member) => (
                                        <tr key={member.member_id}>
                                            <td>{member.name}</td>
                                            <td>{member.subscription_plan}</td>
                                            <td>
                                                <button
                                                    className={`attendance-status ${
                                                        isAbsent[member.member_id] ? "absent" : "present"
                                                    }`}
                                                    onClick={() =>
                                                        markAttendance(member.member_id, 3, isAbsent[member.member_id]) // Replace 3 with dynamic trainer ID
                                                    }
                                                >
                                                    {isAbsent[member.member_id] ? "Present" : "Absent"}
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="3">Loading...</td>
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
