import { useState, useEffect } from "react";
import "../../css/DietList.css";
import url from "../../URL/url"
import {useLoading} from "../LoadingContext";

const DietList = () => {
  const [dietImage, setDietImage] = useState(null);
  // const [loading, setLoading] = useState(true);
  const { showLoader , hideLoader , isLoading}=useLoading();
  const [error, setError] = useState(null);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const member_id = sessionStorage.getItem("userId");

  useEffect(() => {
    const fetchDietChart = async () => {
      try {
        showLoader()
        const response = await fetch(
          `${url}api/membermedicaldetails/${member_id}/`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch diet chart");
        }
        const data = await response.json();
        
        if (data) {
          setDietImage(data.diet_chart_image); 
         
        } else {
          throw new Error("No diet chart available");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        hideLoader()
      }
    };

    fetchDietChart();
  }, []);

  return (
   
    <div className="diet-section">
      <h2>Diet List</h2>
      <div className="diet-container">
        {isLoading && <p>Loading...</p>}
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
