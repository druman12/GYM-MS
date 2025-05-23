import '../css/OwnerSection.css'
import { useState, useEffect } from 'react';
import url from "../URL/url"
import { useLoading } from './LoadingContext';

function OwnerSection() {
  const [OwnerData, setOwnerData] = useState(null);
  // const [loading, setLoading] = useState(true);
  const { showLoader , hideLoader} = useLoading();

  useEffect(() => {
    showLoader()
    fetch(url+'api/ownerdetails/')  
      .then(response => response.json())
      .then(data => {
        setOwnerData(data);
        hideLoader()
      })
      .catch(error => {
        console.error('Error fetching Owner data:', error);
        hideLoader()
      });
  }, []);

  // if (loading) {
  //   return <p className="loading-text">Loading...</p>;
  // }

  return (
    <section className="owner-section">
      <h2 className="owner-header">Owner Section</h2>
      <div className="owner-content">
        <div className="owner-photo">
          <img 
            src={OwnerData?.profile_photo || 'fallback-image.jpg'} 
            alt="Owner" 
            onError={(e) => e.target.src = 'fallback-image.jpg'} 
          />
        </div>
        <div className="owner-details">
          <h2>{OwnerData?.name}</h2>
          <p>{OwnerData?.description || 'No description available.'}</p>
        </div>
      </div>
    </section>
  );
}

export default OwnerSection;
