/* eslint-disable react/prop-types */
import '../../css/ExerciseList.css';
import { useEffect, useState } from "react";
import url from "../../URL/url"

const ExerciseList = ({ member_id: propMemberId}) => {
  const extractedMemberId = propMemberId && typeof propMemberId === "object" ? propMemberId.member_id : propMemberId;
  const member_id = extractedMemberId || sessionStorage.getItem("userId");

  const isMember = propMemberId ? "member" : sessionStorage.getItem("userType");

  const [loading, setLoading] = useState(true);
  const [exerciseList, setExerciseList] = useState(null);
  const [selectedDay, setSelectedDay] = useState(1);
  const [exercises, setExercises] = useState([]);
  const [loadingExercises, setLoadingExercises] = useState(false);

  const url1 = isMember === "member"
    ? `${url}api/exercise/member/${member_id}/workoutplan/`
    : null;

  useEffect(() => {
    if (!url1) {
      setLoading(false);
      return;
    }

    fetch(url1)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setExerciseList(data);
        setLoading(false);

        if (data?.workout_plans?.length > 0) {
          fetchExerciseDetails(1);
        }
      })
      .catch(error => {
        console.error("Error fetching WorkoutPlan data:", error);
        setLoading(false);
      });
  }, [url1]);

  const fetchExerciseDetails = (day) => {
    setLoadingExercises(true);
    setSelectedDay(day);

    fetch(`${url}api/exercise/member/${member_id}/day/${day}/`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setExercises(data.exercises);
        setLoadingExercises(false);
        console.log("122" + data.exercises)
      })
      .catch(error => {
        console.error(`Error fetching exercises for day ${day}:`, error);
        setLoadingExercises(false);
        setExercises([]);
      });
  };

  if (loading) return <p>Loading workout...</p>;

  const focusAreas = exerciseList?.workout_plans?.[0]?.focus_areas || {};

  return (
    <div className="exercise-section">
      <h2>Exercise List</h2>
      <div className="exercise-container">
        <div className="exercise-buttons">
          {[1, 2, 3, 4, 5, 6].map(day => (
            <button
              key={day}
              onClick={() => fetchExerciseDetails(day)}
              className={selectedDay === day ? "active" : ""}
            >
              Day {day} {focusAreas[`day${day}`] || `Day ${day}`}
            </button>
          ))}
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
