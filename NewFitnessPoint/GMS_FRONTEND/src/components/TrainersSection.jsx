import { useEffect, useState } from "react";
import "../css/TrainersSection.css";
import url from "../URL/url"

const TrainersSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [previousIndex, setPreviousIndex] = useState(null);
  const [trainers, setTrainers] = useState([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(url+'api/trainers/')
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setTrainers(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching trainer data:', error);
        setLoading(false);
      });
  }, []);

  // Auto-slide every 5 seconds
  useEffect(() => {
    if (trainers.length <= 1) return; // Don't animate if only one slide
    
    const interval = setInterval(() => {
      if (!isAnimating) {
        nextSlide();
      }
    }, 3000);
    
    return () => clearInterval(interval);
  }, [currentIndex, trainers.length, isAnimating]);

  const nextSlide = () => {
    if (isAnimating || trainers.length <= 1) return;
    
    setIsAnimating(true);
    setPreviousIndex(currentIndex);
    
    // Wait for animation to complete
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % trainers.length);
      setIsAnimating(false);
    }, 800); // Match transition duration in CSS
  };

  const getSlideClassName = (index) => {
    if (index === currentIndex) return "carousel-slide active";
    if (index === previousIndex) return "carousel-slide exit";
    return "carousel-slide";
  };

  if (loading) {
    return <p className="loading-text">Loading...</p>;
  }

  if (trainers.length === 0) {
    return <p className="loading-text">No trainers available.</p>;
  }

  return (
    <section className="trainers-section">
      <h2 className="section-title">Our Trainers</h2>
      <div className="carousel-container">
        <div className="carousel-wrapper">
          {trainers.map((trainer, index) => (
            <div
              key={index}
              className={getSlideClassName(index)}
            >
              <div className="trainer-card">
                <div className="trainer-image-container">
                  <img
                    src={trainer.trainer_profile_photo}
                    alt={trainer.name}
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/150";
                    }}
                  />
                </div>
                <div className="trainer-info">
                  <h3>Name : {trainer.name}</h3>
                  <h4>Experience : {trainer.experience}</h4>
                  <p>Information : {trainer.trainer_info}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrainersSection;