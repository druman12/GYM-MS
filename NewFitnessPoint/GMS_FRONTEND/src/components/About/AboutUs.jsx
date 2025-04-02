import "../../css/AboutUs.css";
import { useState, useEffect } from 'react';
import url from "../../URL/url"


const AboutUs = () => {
   const [AboutData, setAboutData] = useState("");

  useEffect(() => {
    fetch(url+'api/ownerdetails/')  // Replace with your actual API URL
      .then(response => response.json())
      .then(data => setAboutData(data))
      .catch(error => console.error('Error fetching hero data:', error));

      console.log(AboutData)
  }, []);

  return (
    <div className="aboutus-container">
      <div className="aboutus-content">
        <div className="aboutus-image">
          <img src={AboutData.AboutUs_photo} alt="aboutus_image" />
        </div>
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
