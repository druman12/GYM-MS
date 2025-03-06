import '../css/OwnerSection.css'
import { useState, useEffect } from 'react';

function OwnerSection() {

  const [OwnerData, setOwnerData] = useState(null);
  
    useEffect(() => {
      fetch('http://127.0.0.1:8000/api/ownerdetails/')  // Replace with your actual API URL
        .then(response => response.json())
        .then(data =>setOwnerData(data))
        .catch(error => console.error('Error fetching hero data:', error));
    }, []);
  
  return (
    <section className="owner-section">
      <div className="owner-photo">
        <img src="/owner-photo.jpg" alt="Owner" />
      </div>
      <div className="owner-details">
      <p>{OwnerData ? OwnerData.description : 'Loading...'}</p>
      </div>
    </section>
  );
}

export default OwnerSection;
