import { useState, useEffect } from "react";
import "../../../css/BatchList.css";
import Sidebar from "../SideBar";
import TrainerHeader from "../TrainerHeader";
import url from "../../../URL/url";
import { useLoading } from "../../LoadingContext";

const BatchList = () => {
  const [openBatch, setOpenBatch] = useState(null);
  const { showLoader, hideLoader } = useLoading();
  const trainer_id = sessionStorage.getItem("userId");
  const [Batches, setBatches] = useState(null);
  const url1 = `${url}api/batches/trainer/${trainer_id}/`;

  useEffect(() => {
    const fetchBatches = async () => {
      try {
        showLoader();
        const response = await fetch(url1);
        const data = await response.json();
        setBatches(data);
      } catch (error) {
        console.error("Error fetching Batches data:", error);
      } finally {
        hideLoader();
      }
    };

    fetchBatches();
  }, [url1]);

  const Batch_data = Batches ? Batches.batches : [];

  const toggleMembers = (id) => {
    setOpenBatch(openBatch === id ? null : id);
  };

  return (
    <div className="batch-list-container">
      <Sidebar />
      <div className="batch-content">
        <TrainerHeader />
        <h2 className="mobile-header">My Batches</h2>

        {Batch_data.length > 0 ? (
          Batch_data.map((batch) => (
            <div key={batch.batch_id} className="batch-card">
              <div className="batch-header">
                <div>
                  <p className="batch-name">{batch.name}</p>
                  <p className="batch-time">{batch.timing}</p>
                </div>
                <button className="see-member-btn" onClick={() => toggleMembers(batch.batch_id)}>
                  {openBatch === batch.batch_id ? "Hide Members" : "See Member"}
                </button>
              </div>

              {openBatch === batch.batch_id && (
                <div className="member-details">
                  {batch.member_count > 0 ? (
                    <table className="mmember-table">
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Membership</th>
                          <th>Join Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {batch.members.map((member, index) => (
                          <tr key={index}>
                            <td>{member.name}</td>
                            <td>{member.subscription_plan}</td>
                            <td>{member.joining_date}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <p className="no-members">No members in this batch.</p>
                  )}
                </div>
              )}
            </div>
          ))
        ) : (
          <p>No batches found.</p>
        )}
      </div>
    </div>
  );
};

export default BatchList;
