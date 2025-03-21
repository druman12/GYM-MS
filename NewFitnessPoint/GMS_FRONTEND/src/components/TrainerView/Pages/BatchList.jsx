import { useState } from "react";
import "../../../css/batchList.css";
import Sidebar from "../SideBar";
import TrainerHeader from "../TrainerHeader";
import { useEffect } from "react";

const BatchList = () => {
  const [openBatch, setOpenBatch] = useState(null);
  const [loading, setLoading] = useState(true);
  const trainer_id = sessionStorage.getItem("userId");
  const [Batches, setBatches] = useState(null);
  const url = `http://127.0.0.1:8000/api/batches/trainer/${trainer_id}/`;

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setBatches(data);
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

  const Batch_data = Batches.batches;

  const toggleMembers = (id) => {
    setOpenBatch(openBatch === id ? null : id);
  };

  return (
    <div className="batch-list-container">
      <Sidebar />
      <div className="batch-content">
        <TrainerHeader />
        {Batch_data.map((batch) => (
          <div
            key={batch ? batch.batch_id : "Loading..."}
            className="batch-card"
          >
            <div className="batch-header">
              <div>
                <p className="batch-name">
                  {batch ? batch.name : "Loading..."}
                </p>
                <p className="batch-time">
                  {batch ? batch.timing : "Loading..."}
                </p>
              </div>
              <button
                className="see-member-btn"
                onClick={() => toggleMembers(batch.batch_id)}
              >
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
                          <td>{member ? member.name : "Loading..."}</td>
                          <td>
                            {member ? member.subscription_plan : "Loading..."}
                          </td>
                          <td>{member ? member.joining_date : "Loading..."}</td>
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
        ))}
      </div>
    </div>
  );
};

export default BatchList;
