import "../../../css/PersonalTraining.css";
import Sidebar from "../SideBar";
import TrainerHeader from "../TrainerHeader";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PersonalTraining = () => {
  const trainer_id = sessionStorage.getItem("userId");
  const [loading, setLoading] = useState(true);
  const [PT, setPT] = useState(null);
  const navigate = useNavigate();
  const url = `http://127.0.0.1:8000/api/pt/${trainer_id}/`;

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setPT(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching Batches data:", error);
        setLoading(false);
      });
  }, [url]);

  if (loading) {
    return <p>Loading batches...</p>;
  }

  const PT_data = PT.members;

  return (
    <div className="dashboard-container">
      <div className="content-wrapper">
        <Sidebar />
        <div className="PTmain-content">
          <TrainerHeader />
          <h2 className="mobile-header">Personal Training</h2>
          <div className="members-table">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Membership Type</th>
                  <th>Join Date</th>
                  <th>MemberDetails</th>
                </tr>
              </thead>
              <tbody>
                {PT_data.map((member, index) => (
                  <tr key={index}>
                    <td>{member ? member.name : "Loading..."}</td>
                    <td>{member ? member.subscription_plan : "Loading..."}</td>
                    <td>{member ? member.joining_date : "Loading..."}</td>
                    <td>
                      <button onClick={() => navigate(`/member-details/${member.member_id}/${member.name}`)} className="MM_buton">Member Details</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalTraining;
