import '../../css/Memberheader.css';
import PP from '../../assets/profile-boy-icon.png';
import { useNavigate } from "react-router-dom";
import { useLoading } from '../LoadingContext';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import url from "../../URL/url";

const MemberHeader = () => {
  const { showLoader, hideLoader } = useLoading(); // Get loading functions
  const navigate = useNavigate();
  const [memberName, setMemberName] = useState("Member name");
  const memberId = sessionStorage.getItem("userId");

  // Fetch member data on component mount
  useEffect(() => {
    showLoader();
    if (memberId) {
      fetch(`${url}api/member/${memberId}/`)
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then(data => {
          if (data.name) {
            setMemberName(data.name);
           
          }else if (data.username) {
            setMemberName(data.username);
          }
          hideLoader();
        })
        .catch(error => {
          console.error('Error fetching member data:', error);
          hideLoader();
        });
    }else{
      hideLoader();
    } 
  }, [memberId]);

  // Function to handle navigation with loading state
  const handleAction = (path, e = null) => {
    if (e) e.preventDefault();
    if (path === '/') {
      toast.success('Logged out successfully!');
        sessionStorage.removeItem('userId');
        sessionStorage.removeItem('userType');
    }
        navigate(path);

  };

  // Function to navigate to personal details page
  const goToPersonalDetails = () => {
    handleAction('/memberprofile');
  };

  return (
    <div className="Memberheader">
      <div className="Profile" onClick={goToPersonalDetails}>
        <img src={PP} alt="Profile_img" className="profile-pic" />
        <span className="member-name">{memberName}</span>
      </div>    
      <button className="logout-btn" onClick={() => handleAction('/')}>Log Out</button>
    </div>
  );
};

export default MemberHeader;