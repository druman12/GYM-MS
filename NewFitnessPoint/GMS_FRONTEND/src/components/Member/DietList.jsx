import { useState, useEffect } from "react";
import "../../css/DietList.css";

const DietList = () => {
  const [dietImage, setDietImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const member_id = sessionStorage.getItem("userId");

  useEffect(() => {
    const fetchDietChart = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/api/membermedicaldetails/${member_id}/`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch diet chart");
        }
        const data = await response.json();
        console.log("diet"+data)
        if (data) {
          setDietImage(data.diet_chart_image); // Assuming the first item contains the image
        } else {
          throw new Error("No diet chart available");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDietChart();
  }, []);

  return (
   
    <div className="diet-section">
      <h2>Diet List</h2>
      <div className="diet-container">
        {loading && <p>Loading...</p>}
        {error && <p className="error-text">{error}</p>}
        {dietImage && (
          <>
            
            <img
              src={dietImage}
              alt="Diet Chart"
              className="diet-image"
              onClick={() => setIsFullScreen(true)} // Open full-screen mode
            />

            
            {isFullScreen && (
              <div className="full-screen-overlay">
                {/* Close Button in Top-Right of the Window */}
                <button
                  className="close-btn-global"
                  onClick={() => setIsFullScreen(false)}
                >
                  &times;
                </button>
                <img
                  src={dietImage}
                  alt="Diet Chart"
                  className="full-screen-image"
                />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default DietList;
