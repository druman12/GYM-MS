import "../../../css/Attendance.css";
import TrainerHeader from "../TrainerHeader";
import Sidebar from "../SideBar";
import { useState, useEffect } from 'react';

function Attendance() {
    const [attendance, setAttendance] = useState([]);
    const [isAbsent, setIsAbsent] = useState({});
    const [currentDate, setCurrentDate] = useState("");
    
    const url1 = `http://127.0.0.1:8000/api/member/`;
    
    useEffect(() => {
        fetch(url1)
            .then(response => response.json())
            .then(data => {
                setAttendance(data);
                const initialStatus = data.reduce((acc, member) => {
                    acc[member.member_id] = true;
                    return acc;
                }, {});
                setIsAbsent(initialStatus);
            })
            .catch(error => console.error('Error fetching Attendance data:', error));
        
        const today = new Date().toISOString().split('T')[0];
        setCurrentDate(today);
    }, [url1]);
    
    const toggleAttendance = (id) => {
        setIsAbsent(prevState => ({
            ...prevState,
            [id]: !prevState[id]
        }));
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
                        <span className="trainer-name">Trainer Name</span>
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
                                    attendance.map(member => (
                                        <tr key={member.member_id}>
                                            <td>{member.name}</td>
                                            <td>{member.subscription_plan}</td>
                                            <td>
                                                <button 
                                                    className={`attendance-status ${isAbsent[member.member_id] ? 'absent' : 'present'}`} 
                                                    onClick={() => toggleAttendance(member.member_id)}
                                                >
                                                    {isAbsent[member.member_id] ? 'Absent' : 'Present'}
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