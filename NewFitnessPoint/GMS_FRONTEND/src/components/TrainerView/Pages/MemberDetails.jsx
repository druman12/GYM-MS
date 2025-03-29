import { useParams, useNavigate } from "react-router-dom";
import ExerciseList from "../../Member/ExerciseList";
import BMIReport from "../../Member/BMIReport";
import  "../../../css/MemberDetails.css"

const MemberDetails = () => {
  const { member_id,name} = useParams();
  console.log("member name"+name)
 
   // Get member_id from URL
  const navigate = useNavigate(); // Hook for navigation

  return (
    <div className="MD_container">
      {/* Back Button */}
      <button className="MD_back-button" onClick={() => navigate(-1)}>← Back</button>

      {/* Header */}
      <h1 className="MD_title">{name} - Details</h1>
      
      <div className="MD_sections">
        <div className="MD_exercise-section">
          <ExerciseList member_id={member_id} /> {/* Pass member_id */}
        </div>

        <div className="MD_bmi-section">
          <BMIReport member_id={member_id} /> {/* Pass member_id */}
        </div>
      </div>
    </div>
  );
};

export default MemberDetails;
