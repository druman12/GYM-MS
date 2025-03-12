
import '../../css/PersonalDetails.css';
import { useEffect, useState } from 'react';

const PersonalDetails = () => {
  const memberId = sessionStorage.getItem("userId");
  const [loading, setLoading] = useState(true);
  const [PersonalDetail,setPersonalDetail]=useState(null);

  const url = `http://127.0.0.1:8000/api/member/${memberId}/`;

  useEffect(() => {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            setPersonalDetail(data);
            setLoading(false);
        })
        .catch(error => {
            console.error('Error fetching Batches data:', error);
            setLoading(false);
        });
}, [url]);



if (loading) return <p>Loading...</p>;
  return (
    <div className="personal-details-container">
      <h3 className="personal-details-title">Personal Details</h3>
      
      <div className="details-grid">
        <div className="detail-row">
          <span className="detail-label">Name :</span>
          <span className="detail-value">{PersonalDetail?PersonalDetail.name:'Loading...'}</span>
        </div>
        
        <div className="detail-row">
          <span className="detail-label">Date Of Birth :</span>
          <span className="detail-value">{PersonalDetail?PersonalDetail.dateofbirth:'Loading...'}</span>
        </div>
        
        <div className="detail-row">
          <span className="detail-label">Gender :</span>
          <span className="detail-value">{PersonalDetail?PersonalDetail.gender:'Loading...'}</span>
        </div>
        
        <div className="detail-row">
          <span className="detail-label">Height/weight :</span>
          <span className="detail-value">{PersonalDetail?PersonalDetail.height/PersonalDetail.weight:'Loading...'}</span>
        </div>
        
        <div className="detail-row">
          <span className="detail-label">Occupation :</span>
          <span className="detail-value">{PersonalDetail?PersonalDetail.occupation:'Loading...'}</span>
        </div>
        
        <div className="detail-row">
          <span className="detail-label">Address</span>
          <span className="detail-value">{PersonalDetail?PersonalDetail.address:'Loading...'}</span>
        </div>
        
        <div className="detail-row">
          <span className="detail-label">Telephone:</span>
          <span className="detail-value">{PersonalDetail?PersonalDetail.mobile_no:'Loading...'}</span>
        </div>
        
        <div className="detail-row">
          <span className="detail-label">Email :</span>
          <span className="detail-value">{PersonalDetail?PersonalDetail.email:'Loading...'}</span>
        </div>
      </div>
    </div>
  );
};

export default PersonalDetails;