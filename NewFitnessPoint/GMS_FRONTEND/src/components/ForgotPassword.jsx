import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Audio } from "react-loader-spinner";
import "../css/Login.css";
import Logo from "../assets/gms_logo.png";
import { toast } from "react-toastify";

function ForgotPassword() {
  const [password, setPassword] = useState("");
  const [conPassword, setConPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email; // Getting email from previous component


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    
    if (!email) {
      setError("Email not found. Please restart the process.");
      return;
    }

    if (password !== conPassword) {
      setError("Passwords do not match.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("http://127.0.0.1:8000/api/reset_password/", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data) {
        toast.success("Password reset successful!");
        navigate("/login"); // Redirect to login page
      } else {
        setError(data.message || "Password reset failed. Please try again.");
        toast.error("Password reset failed. Please try again.");
      }
    } catch (error) {
      setError("An error occurred. Please try again later.");
      console.error("Reset password error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page-container">
      <div className="mobile-back">
        <p>
          NEW<span className="fitness"> FITNESS </span>POINT
        </p>
      </div>
      <div className="login-container">
        <div className="login-form">
          <h1 className="login-title">Reset Password</h1>
          {error && <div className="error-message">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="password">New Password*</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
            <div className="form-group">
              <label htmlFor="confirm-password">Confirm Password*</label>
              <input
                type="password"
                id="confirm-password"
                value={conPassword}
                onChange={(e) => setConPassword(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
            <button type="submit" className="login-button" disabled={isLoading}>
              Submit
            </button>
          </form>
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

export default ForgotPassword;
