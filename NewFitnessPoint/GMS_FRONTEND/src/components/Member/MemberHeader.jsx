import '../../css/MemberHeader.css';
import PP from '../../assets/profile-boy-icon.png';
const MemberHeader = () => {
  return (
    <div className="Memberheader">
      <div className="Profile">
      <img src={PP} alt="Profile_img" className="profile-pic" />
      <span className="member-name">Member name</span>
      </div>    
      <button className="logout-btn">Log Out</button>
    </div>
  );
};

export default MemberHeader;
