
import '../../css/ExerciseList.css'

const ExerciseList = () => {
  return (
    <div className="exercise-section">
      <h2>Exercise List</h2>
      <div className="exercise-container">
        <div className="exercise-buttons">
          <button>Day 1 Chest & Triceps</button>
          <button>Day 2 Back & Biceps</button>
          <button>Day 3 Shoulder</button>
          <button>Day 4 Legs</button>
          <button>Day 5 Chest & Triceps</button>
          <button>Day 6 Back & Biceps</button>
        </div>
        <div className="exercise-details">Details Of exercises for selected day.</div>
      </div>
    </div>
  );
};

export default ExerciseList;
