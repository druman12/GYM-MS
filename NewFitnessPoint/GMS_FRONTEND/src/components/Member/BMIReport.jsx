/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import "../../css/BMIReport.css";
import url from "../../URL/url"
import {useLoading} from "../LoadingContext";

const BMIReport = ({  member_id: propMemberId  }) => {
 
  const extractedMemberId =
  propMemberId && typeof propMemberId === "object" ? propMemberId.member_id : propMemberId;

const member_id = extractedMemberId || sessionStorage.getItem("userId");

  const [bmiImage, setBmiImage] = useState(null);
  // const [loading, setLoading] = useState(true);
  const { showLoader, hideLoader } = useLoading();
  const [error, setError] = useState(null);
  const [isFullScreen, setIsFullScreen] = useState(false);
  
  useEffect(() => {
    const fetchBMIReport = async () => {
      try {
        showLoader()
        const response = await fetch(`${url}api/membermedicaldetails/${member_id}/`);
      
        if (!response.ok) {
          throw new Error("Failed to fetch BMI report");
        }
        const data = await response.json();

        if (data) {
          setBmiImage(data.bmi_report_image); // Assuming the first item contains the image
        } else {
          throw new Error("No BMI report available");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        // setLoading(false);
        hideLoader()
      }
    };

    fetchBMIReport();
  }, []);

  return (
    <div className="bmi-container">
    <h4 className="bmi-title">BMI Report</h4>
    {/* {loading && <p>Loading...</p>} */}
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
