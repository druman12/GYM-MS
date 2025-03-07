
import { NavLink } from 'react-router-dom';
import '../../css/SideBar.css';

function Sidebar() {
    return (
        <div className="sidebar">
            <div className="trainer-profile">
                <div className="avatar"></div>
                <span className="trainer-name">Trainer name</span>
            </div>
            <nav>
                <ul>
                    <li>
                        <NavLink to="/overview" className={({ isActive }) => isActive ? "active" : ""}>
                            Overview
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/attendance" className={({ isActive }) => isActive ? "active" : ""}>
                            Attendance
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/batches" className={({ isActive }) => isActive ? "active" : ""}>
                            Batches
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/personaltraining" className={({ isActive }) => isActive ? "active" : ""}>
                            Personal training
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default Sidebar;
