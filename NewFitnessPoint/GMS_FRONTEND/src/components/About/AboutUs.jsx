import "../../css/AboutUs.css";
import { useState, useEffect } from 'react';

const AboutUs = () => {
   const [AboutData, setAboutData] = useState(null);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/ownerdetails/')  // Replace with your actual API URL
      .then(response => response.json())
      .then(data => setAboutData(data))
      .catch(error => console.error('Error fetching hero data:', error));
  }, []);

  return (
    <div className="aboutus-container">
      <div className="aboutus-content">
        <div className="aboutus-image"></div>
        <div className="aboutus-text">
          <h2>About Us</h2>
          <p>
           {AboutData?AboutData.aboutUsdescription:'Loading...'}
          </p>
        </div>
      </div>

      <div className="aboutus-bottom">
        <div className="aboutus-box">
          <h3>Mission</h3>
          <p>
           {AboutData?AboutData.mission:'Loading...'}
          </p>
        </div>
        <div className="aboutus-box">
          <h3>Vision</h3>
          <p>
            {AboutData?AboutData.vision:'Loading...'}
           
          </p>
        </div>
        <div className="aboutus-box">
          <h3>Goals</h3>
          <p>
            {AboutData?AboutData.Goals:'Loading...'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
