import  { useState } from "react";
import "../../css/BatchList.css";

const BatchList = () => {
  const [openBatch, setOpenBatch] = useState(null);

  const batches = [
    {
      id: 1,
      name: "Batch name",
      time: "Time",
      members: [{ name: "John Show", membership: "Premium", joinDate: "dd/mm/yyyy" }],
    },
    {
      id: 2,
      name: "Batch name",
      time: "Time",
      members: [],
    },
  ];

  const toggleMembers = (id) => {
    setOpenBatch(openBatch === id ? null : id);
  };

  return (
    <div className="batch-list-container">
      {batches.map((batch) => (
        <div key={batch.id} className="batch-card">
          <div className="batch-header">
            <div>
              <p className="batch-name">{batch.name}</p>
              <p className="batch-time">{batch.time}</p>
            </div>
            <button className="see-member-btn" onClick={() => toggleMembers(batch.id)}>
              {openBatch === batch.id ? "Hide Members" : "See Member"}
            </button>
          </div>
          {openBatch === batch.id && batch.members.length > 0 && (
            <div className="member-details">
              <div className="member-header">
                <span>Name</span>
                <span>Membership Type</span>
                <span>Join Date</span>
              </div>
              {batch.members.map((member, index) => (
                <div key={index} className="member-row">
                  <span>{member.name}</span>
                  <span>{member.membership}</span>
                  <span>{member.joinDate}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default BatchList;
