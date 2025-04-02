import '../../css/PersonalDetails.css';
import { useEffect, useState } from 'react';
import {toast} from 'react-toastify';
import url from "../../URL/url"

const PersonalDetails = () => {
  const memberId = sessionStorage.getItem("userId");
  const [loading, setLoading] = useState(true);
  const [PersonalDetail,setPersonalDetail]=useState(null);

  const url1 = `${url}api/member/${memberId}/`;

  useEffect(() => {
    fetch(url1)
      .then(response => response.json())
      .then(data => {
        setPersonalDetail(data);
        setLoading(false);

        // Check for subscription end date warning
        if (data?.subscription_end_date) {
          const today = new Date();
          const endDate = new Date(data.subscription_end_date);

          const differenceInTime = endDate - today;
          const differenceInDays = differenceInTime / (1000 * 3600 * 24);

          if (differenceInDays <= 7 && differenceInDays >= 0) {
            toast.warning("Your subscription is expiring within a week!");
          }
        }
      })
      .catch(error => {
        console.error('Error fetching member data:', error);
        setLoading(false);
      });
}, [url1]);



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
          <span className="detail-label">Height | weight :</span>
          <span className="detail-value">{PersonalDetail?PersonalDetail.height +" cm | " +PersonalDetail.weight + " kg":'Loading...'}</span>
        </div>
        
        <div className="detail-row">
          <span className="detail-label">Occupation :</span>
          <span className="detail-value">{PersonalDetail?PersonalDetail.occupation:'Loading...'}</span>
        </div>
        
        <div className="detail-row">
          <span className="detail-label">Email :</span>
          <span className="detail-value">{PersonalDetail?PersonalDetail.email:'Loading...'}</span>
        </div>

        <div className="detail-row">
          <span className="detail-label">Subscription Plan :</span>
          <span className="detail-value">{PersonalDetail?PersonalDetail.subscription_plan:'Loading...'}</span>
        </div>

        <div className="detail-row">
          <span className="detail-label">Subscription End Date :</span>
          <span className="detail-value">{PersonalDetail?PersonalDetail.subscription_end_date:'Loading...'}</span>
        </div>

      </div>
    </div>
  );
};

export default PersonalDetails;