import "../css/ContactSection.css";
import { useState, useEffect } from "react";
import Logo from '../assets/gms_logo.png';
import { useNavigate, useLocation } from "react-router-dom"; // Import useLocation
import { SocialIcon } from "react-social-icons";
import { useLoading } from "./LoadingContext"; // Import the loading context
import url from "../URL/url";

const ContactSection = () => {
  const [ContactData, setContactData] = useState(null);
  const { showLoader, hideLoader } = useLoading();
  const navigate = useNavigate();
  const location = useLocation(); // Get the current route

  useEffect(() => {
    fetch(url+"api/ownerdetails/")
      .then((response) => response.json())
      .then((data) => setContactData(data))
      .catch((error) => console.error("Error fetching hero data:", error));
  }, []);

  const handleNavigation = (path, e) => {
    e.preventDefault();
    showLoader();
    setTimeout(() => {
      navigate(path);
      hideLoader();
    }, 500);
  };

  return (
    <div className="contact-section">
      {/* Show Back Button only if NOT on Home Page */}
      {location.pathname === "/contact" && (
        <button className="cback-button" onClick={(e) => handleNavigation("/", e)}>
          &lt;
        </button>
      )}

      <h1 className="contact-title">Contact Us</h1>
      <div className="contact-content">
        <div className="contact-left">
          <div className="logo-box">
            <img src={Logo} alt="Company Logo" className="contact-logo" />
          </div>
          <h2 className="contact-brand">
            NEW <span className="highlight">FITNESS</span> POINT
          </h2>
        </div>

        <div className="contact-center">
          <div className="contact-info">
            <p>{ContactData ? ContactData.Address : "Loading..."} </p>
            <p>{ContactData ? ContactData.officeMobileNo : "Loading..."} </p>
            <p>{ContactData ? ContactData.officeEmail : "Loading..."} </p>
          </div>
          <div className="social-links">
            <SocialIcon url="https://facebook.com/" style={{ height: 30, width: 30 }} />
            <SocialIcon url="https://twitter.com/" style={{ height: 30, width: 30 }} />
            <SocialIcon url="https://instagram.com/" style={{ height: 30, width: 30 }} />
          </div>
        </div>

        <div className="contact-right">
          <h3 className="quick-links-title">Quick Links</h3>
          <ul className="quick-links-list">
            <li><a href="/" onClick={(e) => handleNavigation("/", e)}>Home</a></li>
            <li><a href="/about" onClick={(e) => handleNavigation("/about", e)}>About</a></li>
            <li><a href="/gallery" onClick={(e) => handleNavigation("/gallery", e)}>Gallery</a></li>
            <li><a href="#">T &amp; C</a></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;
