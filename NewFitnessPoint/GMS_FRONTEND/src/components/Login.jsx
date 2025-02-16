import { useState } from "react";
import "../css/Login.css";
import Logo from "../assets/gms_logo.png";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted", { email, password, rememberMe });
  };

  return (
    <div className="login-page-container">
      <div className="login-container">
        <div className="login-form">
          <h1 className="login-title">Login</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email*</label>
              <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password*</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="form-options">
              <div className="remember-me">
                <input
                  type="checkbox"
                  id="remember"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <label htmlFor="remember">Remember me</label>
              </div>
              <a href="#" className="forgot-password">
                Forgot Password?
              </a>
            </div>
            <button type="submit" className="login-button">
              Login
            </button>
          </form>
        </div>
        <div className="brand-section">
          <img src={Logo} alt="New Fitness Point Logo" className="brand-logo" />
          <div className="brand-text">
            <span>NEW</span>
            <span className="fitness">FITNESS</span>
            <span>POINT</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
