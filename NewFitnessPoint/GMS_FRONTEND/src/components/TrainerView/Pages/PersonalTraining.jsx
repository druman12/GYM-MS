// import "../../../css/PersonalTraining.css";
// import Sidebar from "../SideBar";
// import TrainerHeader from "../TrainerHeader";
// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import url from "../../../URL/url"
// import { useLoading } from "../../LoadingContext";

// const PersonalTraining = () => {
//   const trainer_id = sessionStorage.getItem("userId");
//   // const [loading, setLoading] = useState(true);
//   const { showLoader, hideLoader } = useLoading();
//   const [PT, setPT] = useState(null);
//   const navigate = useNavigate();
//   const url1 = `${url}api/pt/${trainer_id}/`;

//   useEffect(() => {
//     showLoader()
//     fetch(url1)
//       .then((response) => response.json())
//       .then((data) => {
//         setPT(data);
//        hideLoader()
//       })
//       .catch((error) => {
//         console.error("Error fetching Batches data:", error);
//         hideLoader()
//       });
//   }, [url1]);

//   // if (loading) {
//   //   return <p>Loading batches...</p>;
//   // }

//   const PT_data = PT.members;

//   return (
//     <div className="dashboard-container">
//       <div className="content-wrapper">
//         <Sidebar />
//         <div className="PTmain-content">
//           <TrainerHeader />
//           <h2 className="mobile-header">Personal Training</h2>
//           <div className="members-table">
//             <table>
//               <thead>
//                 <tr>
//                   <th>Name</th>
//                   <th>Membership Type</th>
//                   <th>Join Date</th>
//                   <th>MemberDetails</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {PT_data.map((member, index) => (
//                   <tr key={index}>
//                     <td>{member ? member.name : "Loading..."}</td>
//                     <td>{member ? member.subscription_plan : "Loading..."}</td>
//                     <td>{member ? member.joining_date : "Loading..."}</td>
//                     <td>
//                       <button onClick={() => navigate(`/member-details/${member.member_id}/${member.name}`)} className="MM_buton">Member Details</button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PersonalTraining;

import "../../../css/PersonalTraining.css";
import Sidebar from "../SideBar";
import TrainerHeader from "../TrainerHeader";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import url from "../../../URL/url";
import { useLoading } from "../../LoadingContext";

const PersonalTraining = () => {
  const trainer_id = sessionStorage.getItem("userId");
  const { showLoader, hideLoader } = useLoading();
  const [PT, setPT] = useState(null);
  const navigate = useNavigate();
  const url1 = `${url}api/pt/${trainer_id}/`;

  useEffect(() => {
    const fetchPT = async () => {
      try {
        showLoader();
        const response = await fetch(url1);
        const data = await response.json();
        setPT(data);
      } catch (error) {
        console.error("Error fetching PT data:", error);
      } finally {
        hideLoader();
      }
    };

    fetchPT();
  }, [url1]);

  const PT_data = PT ? PT.members : [];

  return (
    <div className="dashboard-container">
      <div className="content-wrapper">
        <Sidebar />
        <div className="PTmain-content">
          <TrainerHeader />
          <h2 className="mobile-header">Personal Training</h2>
          <div className="members-table">
            {PT_data.length > 0 ? (
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Membership Type</th>
                    <th>Join Date</th>
                    <th>Member Details</th>
                  </tr>
                </thead>
                <tbody>
                  {PT_data.map((member, index) => (
                    <tr key={index}>
                      <td>{member.name}</td>
                      <td>{member.subscription_plan}</td>
                      <td>{member.joining_date}</td>
                      <td>
                        <button
                          onClick={() =>
                            navigate(`/member-details/${member.member_id}/${member.name}`)
                          }
                          className="MM_buton"
                        >
                          Member Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No personal training members found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalTraining;
