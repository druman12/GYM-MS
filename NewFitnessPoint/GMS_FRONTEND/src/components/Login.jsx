import { useState } from "react";
import { Audio } from 'react-loader-spinner';
import { useNavigate } from "react-router-dom";
import "../css/Login.css";
import Logo from "../assets/gms_logo.png";
import { toast } from "react-toastify";
import url from "../URL/url"

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    
    try {
      const response = await fetch(url+"api/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      
      const data = await response.json();
      
      if (data.status === true) {
        if (data.member_id) {
          sessionStorage.setItem("userId", data.member_id);
          sessionStorage.setItem("userType", "member");
          toast.success("Login successful!");
          navigate("/member-home");
        } else if (data.trainer_id) {
          sessionStorage.setItem("userId", data.trainer_id);
          sessionStorage.setItem("userType", "trainer");
          toast.success("Login successful!");
          navigate("/overview");
        }
      } else {
        if(data.error === "Subscription expired"){
          setError("Subscription expired. Please renew your subscription ");
          toast.error("Subscription expired. Please renew your subscription ");
        }else{
          setError("Login failed. Please check your email and password.");
          toast.error("Login failed. Please check your email and password.");
        }        
      }
    } catch (error) {
      
      setError("An error occurred. Please try again later.");
     
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page-container">
      <div className="mobile-back">
          <p>NEW<span className="fitness"> FITNESS </span>POINT </p>
      </div>
      <div className="login-container">
        <div className="login-form">
          <h1 className="login-title">Login</h1>
          {error && <div className="error-message">{error}</div>}
          <form onSubmit={handleSubmit}>
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
            <div className="form-group">
              <label htmlFor="password">Password*</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
            <div className="forgot-password">
              <p onClick={() => navigate("/otp-verification")} className="forgot-password-link">
                Forgot Password?
              </p>
            </div>
            <button 
              type="submit" 
              className="login-button" 
              disabled={isLoading}
            >
              Login
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
      
      {/* Overlay with Audio spinner when loading */}
      {isLoading && (
        <div className="loader-overlay">
          <div className="loader-container">
            <Audio
              height="80"
              width="80"
              radius="9"
              color="#FFCED0"
              ariaLabel="loading"
              wrapperStyle={{}}
              wrapperClass=""
            />
            <p>Logging in...</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;