import '../css/HeroSection.css';

import { useState, useEffect } from 'react';


function HeroSection() {

  const [heroData, setHeroData] = useState(null);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/ownerdetails/')  // Replace with your actual API URL
      .then(response => response.json())
      .then(data => setHeroData(data))
      .catch(error => console.error('Error fetching hero data:', error));
  }, []);

  return (
    <section className="hero-section">
      <div className="overlay"></div>
      <div className="hero-content">
        <h1>NEW <span className="highlight">FITNESS </span>POINT</h1>
        <p>{heroData ? heroData.hero_content1 : 'Loading...'}</p>
      </div>
      <div className="content-right">
        <div className="right-banner">
          <p>{heroData ? heroData.hero_content2 : 'Loading...'}</p>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
