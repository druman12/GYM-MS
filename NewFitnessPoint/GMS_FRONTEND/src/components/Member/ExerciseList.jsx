
import '../../css/ExerciseList.css'
import { useEffect } from "react";
import { useState } from "react";

const ExerciseList = () => {
  const [loading, setLoading] = useState(true);
  const [ExerciseList, setExerciseList] = useState(null);
  
  const member_id = localStorage.getItem("userId");
  const isMember = localStorage.getItem("userType");

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
        })
        .catch(error => {
            console.error('Error fetching WorkoutPlan data:', error);
            setLoading(false);
        });
  }, [url]);

  if (loading) return <p>Loading workout...</p>;


 const member_data = ExerciseList.workout_plans.focus_areas;


  return (
    <div className="exercise-section">
      <h2>Exercise List</h2>
      <div className="exercise-container">
        <div className="exercise-buttons">
          <button>{member_data?member_data.day1:'Loading...'}</button>
          <button>{member_data?member_data.day2:'Loading...'}</button>
          <button>{member_data?member_data.day3:'Loading...'}</button>
          <button>{member_data?member_data.day4:'Loading...'}</button>
          <button>{member_data?member_data.day5:'Loading...'}</button>
          <button>{member_data?member_data.day6:'Loading...'}</button>
        </div>
        <div className="exercise-details">Details Of exercises for selected day.</div>
      </div>
    </div>
  );
};

export default ExerciseList;
