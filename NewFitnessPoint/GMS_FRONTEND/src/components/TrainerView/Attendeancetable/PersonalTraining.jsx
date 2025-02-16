

import '../../../css/PersonalTraining.css'

const PersonalTraining = () => {
  const members = [
    { name: "John Show", membership: "Premium", joinDate: "dd/mm/yyyy" },
    { name: "John Show", membership: "Premium", joinDate: "dd/mm/yyyy" },
    { name: "John Show", membership: "Premium", joinDate: "dd/mm/yyyy" },
  ];

  return (
    <div className="table-container">
      <h2 className="table-title">PersonalTraining</h2>
      <table className="personal-training-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Membership Type</th>
            <th>Join Date</th>
          </tr>
        </thead>
        <tbody>
          {members.map((member, index) => (
            <tr key={index}>
              <td>{member.name}</td>
              <td>{member.membership}</td>
              <td>{member.joinDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PersonalTraining;
