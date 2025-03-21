import { useState, useEffect } from "react";
import "../../css/BMIReport.css";

const BMIReport = () => {
  const [bmiImage, setBmiImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFullScreen, setIsFullScreen] = useState(false);
  
  useEffect(() => {
    const fetchBMIReport = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/membermedicaldetails/");
        if (!response.ok) {
          throw new Error("Failed to fetch BMI report");
        }
        const data = await response.json();

        if (data.length > 0) {
          setBmiImage(data[0].bmi_report_image); // Assuming the first item contains the image
        } else {
          throw new Error("No BMI report available");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBMIReport();
  }, []);

  return (
    <div className="bmi-container">
    <h4 className="bmi-title">BMI Report</h4>
    {loading && <p>Loading...</p>}
    {error && <p className="error-text">{error}</p>}
    
    {bmiImage && (
      <>
        {/* Thumbnail Image */}
        <img
          src={bmiImage}
          alt="BMI Report"
          className="bmi-image"
          onClick={() => setIsFullScreen(true)} // Open full-screen mode
        />

        {/* Full-Screen Image Modal */}
        {isFullScreen && (
          <div className="full-screen-overlay">
            {/* Close Button in Top-Right of the Window */}
            <button className="close-btn-global" onClick={() => setIsFullScreen(false)}>
              &times;
            </button>
            <img src={bmiImage} alt="BMI Report" className="full-screen-image" />
          </div>
        )}
      </>
    )}
  </div>
);
};

export default BMIReport;
