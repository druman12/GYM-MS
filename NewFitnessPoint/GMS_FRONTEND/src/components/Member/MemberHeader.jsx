import '../../css/MemberHeader.css';

const MemberHeader = () => {
  return (
    <div className="header">
      <img src="profile.jpg" alt="Profile" className="profile-pic" />
      <span className="member-name">Member name</span>
      <button className="logout-btn">Log Out</button>
    </div>
  );
};

export default MemberHeader;
