import "../../../css/personalTraining.css"
import Sidebar from "../SideBar";
import TrainerHeader from "../TrainerHeader";

const PersonalTraining = () => {
  const members = [
    { name: "John show", membership: "Premium", joinDate: "dd/mm/yyyy" },
    { name: "John show", membership: "Premium", joinDate: "dd/mm/yyyy" },
    { name: "John show", membership: "Premium", joinDate: "dd/mm/yyyy" },
  ];

  return (
    <div className="dashboard-container">
      <div className="content-wrapper">
        <Sidebar />
        <div className="main-content">
        <TrainerHeader />
          <div className="members-table">
            <table>
              <thead>
                <tr>
                  <th>name</th>
                  <th>membership type</th>
                  <th>Join date</th>
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
        </div>
      </div>
    </div>
  );
};

export default PersonalTraining;