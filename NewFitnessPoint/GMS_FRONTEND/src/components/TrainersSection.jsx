import { useEffect, useState, useRef } from "react";
import "../css/TrainersSection.css";

export default function TrainersSection() {
  const trainers = [
    {
      name: "Jane Doe",
      designation: "Personal Trainer",
      description: "Expert in fitness coaching and weight training.",
      image: "https://images.pexels.com/photos/5473187/pexels-photo-5473187.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=100",
    },
    {
      name: "John Smith",
      designation: "Yoga & Wellness Coach",
      description: "Focuses on mindfulness, flexibility, and balance.",
      image: "https://images.pexels.com/photos/4325461/pexels-photo-4325461.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=100",
    },
    {
      name: "Emily Johnson",
      designation: "Cardio Specialist",
      description: "Helps with endurance training and running techniques.",
      image: "https://images.pexels.com/photos/6455596/pexels-photo-6455596.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=100",
    },
  ]

  const [currentIndex, setCurrentIndex] = useState(0)
  const carouselRef = useRef(null)
  const cardWidth = 100 / trainers.length // Each card takes equal width percentage
  const animationDuration = 3000 // 3 seconds per slide
  const transitionDuration = 500 // 0.5 seconds for the transition

  // Create an extended array for seamless looping
  // We duplicate the array to ensure we always have enough items to display
  const extendedTrainers = [...trainers, ...trainers, ...trainers]

  useEffect(() => {
    const interval = setInterval(() => {
      // Move to the next trainer
      setCurrentIndex((prevIndex) => {
        const nextIndex = prevIndex + 1

        // If we've reached the end of our original set, reset to the beginning
        // but do it after the transition completes to make it seamless
        if (nextIndex >= trainers.length * 2) {
          setTimeout(() => {
            if (carouselRef.current) {
              // Disable transition temporarily for the reset
              carouselRef.current.style.transition = "none"
              setCurrentIndex(nextIndex % trainers.length)

              // Force a reflow to ensure the transition is disabled during the reset
              carouselRef.current.offsetHeight

              // Re-enable transition for future slides
              setTimeout(() => {
                if (carouselRef.current) {
                  carouselRef.current.style.transition = `transform ${transitionDuration}ms ease-in-out`
                }
              }, 20)
            }
          }, transitionDuration)
        }

        return nextIndex
      })
    }, animationDuration)

    return () => clearInterval(interval)
  }, [trainers.length])

  // Calculate the transform value
  const translateX = `-${currentIndex * cardWidth}%`

  return (
    <section className="trainers-section">
      <h2>Our Expert Trainers</h2>
      <div className="carousel-container">
        <div
          ref={carouselRef}
          className="carousel"
          style={{
            transform: `translateX(${translateX})`,
            transition: `transform ${transitionDuration}ms ease-in-out`,
            width: `${extendedTrainers.length * cardWidth}%`, // Set width based on number of items
          }}
        >
          {extendedTrainers.map((trainer, idx) => (
            <div
              key={idx}
              className="trainer-card"
              style={{ width: `${cardWidth}%` }} // Each card has equal width
            >
              <div className="trainer-image-container">
                <img
                  src={trainer.image || "/placeholder.svg"}
                  alt={trainer.name}
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/100"
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
  )
}