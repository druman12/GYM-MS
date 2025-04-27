// import { useState, useEffect } from "react";
// import { NavLink } from "react-router-dom";
// import "../../css/SideBar.css";
// import url from "../../URL/url"
// import { useLoading } from "../LoadingContext";

// function Sidebar() {
//   const trainer_id = sessionStorage.getItem("userId");
//   const [trainer, setTrainer] = useState(null);
//   const { showLoader, hideLoader } = useLoading();
//   const url1 = `${url}api/trainer/${trainer_id}/`;
  
//    useEffect(() => {
//       showLoader()
//        fetch(url1)  // Replace with your actual API URL
//           .then(response => response.json())
//           .then(data => setTrainer(data))
//           .catch(error => console.error('Error fetching trainer data:', error))
//           .finally(()=> hideLoader())
//       }, [url1]);


//   return (
//     <div className="sidebar">
//       <div className="trainer-profile">
//         <div className="avatar">
//           {trainer && trainer.trainer_profile_photo ? (
//             <img
//               src={trainer.trainer_profile_photo}
//               alt="Trainer Avatar"
//               className="trainer-img"
//             />
//           ) : (
//             <span>Loading...</span>
//           )}
//         </div>
//         <span className="trainer-name">
//           {trainer ? trainer.name : "Loading..."}
//         </span>
//       </div>
//       <nav>
//         <ul>
//           <li>
//             <NavLink
//               to="/overview"
//               className={({ isActive }) => (isActive ? "active" : "")}
//             >
//               Overview
//             </NavLink>
//           </li>
//           <li>
//             <NavLink
//               to="/attendance"
//               className={({ isActive }) => (isActive ? "active" : "")}
//             >
//               Attendance
//             </NavLink>
//           </li>
//           <li>
//             <NavLink
//               to="/batches"
//               className={({ isActive }) => (isActive ? "active" : "")}
//             >
//               Batches
//             </NavLink>
//           </li>
//           <li>
//             <NavLink
//               to="/personaltraining"
//               className={({ isActive }) => (isActive ? "active" : "")}
//             >
//               Personal training
//             </NavLink>
//           </li>
//         </ul>
//       </nav>
//     </div>
//   );
// }

// export default Sidebar;

import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "../../css/SideBar.css";
import url from "../../URL/url";
import { useLoading } from "../LoadingContext";

function Sidebar() {
  const trainer_id = sessionStorage.getItem("userId");
  const [trainer, setTrainer] = useState(null);
  const { showLoader, hideLoader } = useLoading();
  const url1 = `${url}api/trainer/${trainer_id}/`;

  useEffect(() => {
    const fetchTrainer = async () => {
      try {
        showLoader();
        const response = await fetch(url1);
        const data = await response.json();
        setTrainer(data);
      } catch (error) {
        console.error('Error fetching trainer data:', error);
      } finally {
        hideLoader();
      }
    };

    fetchTrainer();
  }, [url1]);

  return (
    <div className="sidebar">
      <div className="trainer-profile">
        <div className="avatar">
          {trainer && trainer.trainer_profile_photo && (
            <img
              src={trainer.trainer_profile_photo}
              alt="Trainer Avatar"
              className="trainer-img"
            />
          )}
        </div>
        <span className="trainer-name">
          {trainer && trainer.name}
        </span>
      </div>
      <nav>
        <ul>
          <li>
            <NavLink
              to="/overview"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Overview
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/attendance"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Attendance
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/batches"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Batches
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/personaltraining"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Personal training
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar;
