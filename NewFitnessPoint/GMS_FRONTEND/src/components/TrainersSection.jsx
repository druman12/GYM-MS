import { useEffect, useState, useRef } from "react";
import "../css/TrainersSection.css";

export default function TrainersSection() {
    const [trainers, setTrainers] = useState([]);
    const carouselRef = useRef(null);

    const animationDuration = 3000;
    const transitionDuration = 500;
    const [currentIndex, setCurrentIndex] = useState(0);

    // const baseImageUrl = "http://127.0.0.1:8000/";

    useEffect(() => {
        const fetchTrainers = async () => {
            try {
                const urls = [
                    "http://127.0.0.1:8000/api/trainer/3/",
                    "http://127.0.0.1:8000/api/trainer/4/",
                    "http://127.0.0.1:8000/api/trainer/5/"
                ];

                const responses = await Promise.all(urls.map(url => fetch(url).then(res => res.json())));
                const formattedTrainers = responses.map(trainer => ({
                    name: trainer.name,
                    experience: "Experience: " + trainer.experience + " years",
                    description: trainer.trainer_info,
                    image: trainer.trainer_profile_photo
                }));
                setTrainers(formattedTrainers);
            } catch (error) {
                console.error("Failed to fetch trainers", error);
            }
        };

        fetchTrainers();
    }, []);

    const cardWidth = 100 / trainers.length;
    const extendedTrainers = [...trainers, ...trainers, ...trainers];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => {
                const nextIndex = prevIndex + 1;

                if (nextIndex >= trainers.length * 2) {
                    setTimeout(() => {
                        if (carouselRef.current) {
                            carouselRef.current.style.transition = "none";
                            setCurrentIndex(nextIndex % trainers.length);
                            carouselRef.current.offsetHeight;
                            setTimeout(() => {
                                if (carouselRef.current) {
                                    carouselRef.current.style.transition = `transform ${transitionDuration}ms ease-in-out`;
                                }
                            }, 20);
                        }
                    }, transitionDuration);
                }

                return nextIndex;
            });
        }, animationDuration);

        return () => clearInterval(interval);
    }, [trainers.length]);

    const translateX = `-${currentIndex * cardWidth}%`;

    return (
        <section className="trainers-section">
            <h2>Our Expert Trainers</h2>
            {trainers.length === 0 ? (
                <p>Loading trainers...</p>
            ) : ( 
                <div className="carousel-container">
                    <div
                        ref={carouselRef}
                        className="carousel"
                        style={{
                            transform: `translateX(${translateX})`,
                            transition: `transform ${transitionDuration}ms ease-in-out`,
                            width: `${extendedTrainers.length * cardWidth}%`,
                        }}
                    >
                        {extendedTrainers.map((trainer, idx) => (
                            <div
                                key={idx}
                                className="trainer-card"
                                style={{ width: `${cardWidth}%` }}
                            >
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
                                    <h4>{trainer.experience}</h4>
                                    <p>{trainer.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </section>
    );
}
