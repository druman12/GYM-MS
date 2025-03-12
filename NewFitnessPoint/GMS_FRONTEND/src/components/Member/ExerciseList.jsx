import '../../css/ExerciseList.css';
import { useEffect, useState } from "react";

const ExerciseList = () => {
  const [loading, setLoading] = useState(true);
  const [exerciseList, setExerciseList] = useState(null);
  const [selectedDay, setSelectedDay] = useState(1);
  const [exercises, setExercises] = useState([]);
  const [loadingExercises, setLoadingExercises] = useState(false);

  const member_id = sessionStorage.getItem("userId");
  const isMember = sessionStorage.getItem("userType");

  const url = isMember === 'member' 
    ? `http://127.0.0.1:8000/api/exercise/member/${member_id}/workoutplan/` 
    : null;

  useEffect(() => {
    if (!url) {
      setLoading(false);
      return;
    }

    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setExerciseList(data);
        setLoading(false);
        // Fetch exercises for day 1 by default when workout plan loads
        fetchExerciseDetails(1);
      })
      .catch(error => {
        console.error('Error fetching WorkoutPlan data:', error);
        setLoading(false);
      });
  }, [url]);

  const fetchExerciseDetails = (day) => {
    setLoadingExercises(true);
    setSelectedDay(day);
    
    fetch(`http://127.0.0.1:8000/api/exercise/member/${member_id}/day/${day}/`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setExercises(data.exercises);
        
        setLoadingExercises(false);
      })
      .catch(error => {
        console.error(`Error fetching exercises for day ${day}:`, error);
        setLoadingExercises(false);
        
        setExercises([]);
      });
  };

  if (loading) return <p>Loading workout...</p>;

  // Ensure we have valid data before accessing properties
  const focusAreas = exerciseList?.workout_plans?.[0]?.focus_areas || {};

  return (
    <div className="exercise-section">
      <h2>Exercise List</h2>
      <div className="exercise-container">
        <div className="exercise-buttons">
          <button 
            onClick={() => fetchExerciseDetails(1)}
            className={selectedDay === 1 ? "active" : ""}
          >
            Day1 {focusAreas.day1 || 'Day 1'}
          </button>
          <button 
            onClick={() => fetchExerciseDetails(2)}
            className={selectedDay === 2 ? "active" : ""}
          >
            Day2 {focusAreas.day2 || 'Day 2'}
          </button>
          <button 
            onClick={() => fetchExerciseDetails(3)}
            className={selectedDay === 3 ? "active" : ""}
          >
           Day3 {focusAreas.day3 || 'Day 3'}
          </button>
          <button 
            onClick={() => fetchExerciseDetails(4)}
            className={selectedDay === 4 ? "active" : ""}
          >
            Day4 {focusAreas.day4 || 'Day 4'}
          </button>
          <button 
            onClick={() => fetchExerciseDetails(5)}
            className={selectedDay === 5 ? "active" : ""}
          >
            Day5 {focusAreas.day5 || 'Day 5'}
          </button>
          <button 
            onClick={() => fetchExerciseDetails(6)}
            className={selectedDay === 6 ? "active" : ""}
          >
            Day6 {focusAreas.day6 || 'Day 6'}
          </button>
        </div>
        <div className="exercise-details">
          {loadingExercises ? (
            <p>Loading exercises...</p>
          ) : exercises.length > 0 ? (
            
            <div className="exercises-list">
              <h3>Day {selectedDay}: {focusAreas[`day${selectedDay}`]}</h3>
              <table className="exercise-table">
                <thead>
                  <tr>
                    <th>Exercise</th>
                    <th>Sets</th>
                    <th>Reps</th>
                  </tr>
                </thead>
                <tbody>
                  {exercises.map((exercise, index) => (
                    <tr key={index}>
                      <td>{exercise.exercise_name}</td>
                      <td>{exercise.sets}</td>
                      <td>{exercise.reps}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p>No exercises found for this day.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExerciseList;