import { useState , useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import '../../css/SideBar.css';

function Sidebar() {

    const trainer_id=localStorage.getItem('userId');
    const [trainer, setTrainer] = useState(null);
    const url=`http://127.0.0.1:8000/api/trainer/${trainer_id}/`
    
      useEffect(() => {
        fetch(url)  // Replace with your actual API URL
          .then(response => response.json())
          .then(data => setTrainer(data))
          .catch(error => console.error('Error fetching trainer data:', error));
      }, []);

    return (
        <div className="sidebar">
            <div className="trainer-profile">
                <div className="avatar"></div>
                <span className="trainer-name">{trainer ? trainer.name : 'Loading...'}</span>
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
