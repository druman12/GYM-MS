import "../../../css/Attendance.css";
import Sidebar from "../SideBar";
import TrainerHeader from "../TrainerHeader";


const Attendance = () => {
    return (
        <div className="attendance-container">
            
                <Sidebar />
            
            <div className="attendance-content">
                <TrainerHeader/>
                <h3 className="attendance-title">Mark Attendance</h3>
                <p className="month-year">&lt; Month year &gt;</p>
                <div className="attendance-table-wrapper">
                    <table className="attendance-table">
                        <thead>
                            <tr>
                                <th>Monday</th>
                                <th>Tuesday</th>
                                <th>Wednesday</th>
                                <th>Thursday</th>
                                <th>Friday</th>
                                <th>Saturday</th>
                                <th>Sunday</th>
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
        </div>
    );
};

export default Attendance;
