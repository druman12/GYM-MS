import { useState } from "react";
import { Audio } from 'react-loader-spinner';
import { useNavigate } from "react-router-dom";
import "../css/Login.css";
import Logo from "../assets/gms_logo.png";
import {toast} from 'react-toastify';

function OTPSection() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const navigate = useNavigate();

  const handleSendOTP = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch("http://127.0.0.1:8000/api/send-otp/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsOtpSent(true);
        toast.success("OTP sent successfully");
      } else {
        setError(data.error || "Failed to send OTP. Please try again.");
        toast.error("Failed to send OTP. Please try again.");
      }
    } catch (error) {
      setError("An error occurred. Please try again later.");
      console.error("Send OTP error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch("http://127.0.0.1:8000/api/verify-otp/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, otp }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("OTP verified successfully");
        navigate("/reset-password", { state: { email } });  // Redirect to reset password page
      } else {
        setError(data.error || "Invalid OTP. Please try again.");
      }
    } catch (error) {
      setError("An error occurred. Please try again later.");
      console.error("Verify OTP error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page-container">
      <div className="mobile-back">
        <p>NEW<span className="fitness"> FITNESS </span>POINT</p>
      </div>
      <div className="login-container">
        <div className="login-form">
          <h1 className="login-title">Forgot Password</h1>
          {error && <div className="error-message">{error}</div>}

          {/* Email Input & Send OTP */}
          {!isOtpSent ? (
            <form onSubmit={handleSendOTP}>
              <div className="form-group">
                <label htmlFor="email">Email*</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isLoading}
                />
              </div>
              <button type="submit" className="otp-button" disabled={isLoading}>
                Send OTP on Email
              </button>
            </form>
          ) : (
            // OTP Verification
            <form onSubmit={handleVerifyOTP}>
              <div className="form-group">
                <label htmlFor="otp">OTP*</label>
                <input
                  type="text"
                  id="otp"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                  disabled={isLoading}
                />
              </div>
              <button type="submit" className="login-button" disabled={isLoading}>
                Verify OTP
              </button>
            </form>
          )}
        </div>

        <div className="brand-section">
          <img src={Logo} alt="New Fitness Point Logo" className="brand-logo" />
          <div className="brand-text">
            <span>NEW </span>
            <span className="fitness">FITNESS </span>
            <span>POINT</span>
          </div>
        </div>
      </div>

      {/* Loading Spinner */}
      {isLoading && (
        <div className="loader-overlay">
          <div className="loader-container">
            <Audio height="80" width="80" radius="9" color="#FFCED0" ariaLabel="loading" />
            <p>Loading...</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default OTPSection;
