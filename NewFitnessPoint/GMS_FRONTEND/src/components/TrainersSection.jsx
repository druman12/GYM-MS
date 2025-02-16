import { useEffect, useState } from "react";
import "../css/TrainersSection.css";

function TrainersSection() {
  const trainers = [
    {
      name: "Jane Doe",
      designation: "Personal Trainer",
      description: "Expert in fitness coaching and weight training.",
      image:
        "https://images.pexels.com/photos/5473187/pexels-photo-5473187.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=100",
    },
    {
      name: "John Smith",
      designation: "Yoga & Wellness Coach",
      description: "Focuses on mindfulness, flexibility, and balance.",
      image:
        "https://images.pexels.com/photos/4325461/pexels-photo-4325461.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=100",
    },
    {
      name: "Emily Johnson",
      designation: "Cardio Specialist",
      description: "Helps with endurance training and running techniques.",
      image:
        "https://images.pexels.com/photos/6455596/pexels-photo-6455596.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=100",
    },
  ];

  const [index, setIndex] = useState(1); // Start at the second card for centering

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % trainers.length);
    }, 3000); // Change slides every 3 seconds

    return () => clearInterval(interval);
  }, [trainers.length]);

  return (
    <section className="trainers-section">
      <h2>Trainers</h2>
      <div className="carousel-container">
        <div
          className="carousel"
          style={{
            transform: `translateX(-${index * 33.33}%)`,
          }}
        >
          {[...trainers, ...trainers, ...trainers].map((trainer, idx) => (
            <div key={idx} className="trainer-card">
              <div className="trainer-image-container">
                <img
                  src={trainer.image}
                  alt={trainer.name}
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/100";
                  }}
                />
              </div>
              <div className="trainer-info">
                <h3>{trainer.name}</h3>
                <h4>{trainer.designation}</h4>
                <p>{trainer.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TrainersSection;
