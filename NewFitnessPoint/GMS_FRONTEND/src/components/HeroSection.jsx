import '../css/HeroSection.css';
import { useState, useEffect } from 'react';

function HeroSection() {
  const [heroData, setHeroData] = useState(null);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/ownerdetails/') // Replace with your actual API URL
      .then(response => response.json())
      .then(data => setHeroData(data))
      .catch(error => console.error('Error fetching hero data:', error));
  }, []);

  const backgroundImage = heroData?.heroimage
    ? `url(${heroData.heroimage})`
    : `url('../assets/weightlifting.jpg')`; // Default background image

  return (
    <section className="hero-section" style={{ backgroundImage, backgroundSize: 'cover', backgroundPosition: 'center' }}>
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