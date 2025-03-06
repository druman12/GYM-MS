import '../css/ContactSection.css';
import Logo from '../assets/gms_logo.png';
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useLoading } from './LoadingContext'; // Import the loading context

const ContactSection = () => {
  const [ContactData, setContactData] = useState(null);
  const { showLoader, hideLoader } = useLoading(); // Get loading functions
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/ownerdetails/')  // Replace with your actual API URL
      .then(response => response.json())
      .then(data => setContactData(data))
      .catch(error => console.error('Error fetching hero data:', error));
  }, []);

  // Function to handle navigation with loading state
  const handleNavigation = (path, e) => {
    e.preventDefault();
    showLoader(); // Show loader before navigation
    
    // Use setTimeout to simulate loading (can be removed in production)
    setTimeout(() => {
      navigate(path);
      hideLoader(); // Hide loader after navigation
    }, 500); // Simulating a short delay for demonstration
  };

  return (
    <div className="contact-section">
      <h1 className="contact-title">Contact Us</h1>
      <div className="contact-content">
        {/* Left Section */}
        <div className="contact-left">
          <div className="logo-box">
            <img src={Logo} alt="Company Logo" className="contact-logo" />
          </div>
          <h2 className="contact-brand">
            NEW <span className="highlight">FITNESS</span> POINT
          </h2>
        </div>

        {/* Center Section */}
        <div className="contact-center">
        <p>{ContactData ? ContactData.Address : 'Loading...'} </p>
          <p>{ContactData ? ContactData.officeMobileNo:'Loading...'} </p>
          <p>{ContactData ? ContactData.officeEmail:'Loading...'} </p>
          <div className="social-links">
            <i className="fab fa-facebook"></i>
            <i className="fab fa-twitter"></i>
            <i className="fab fa-instagram"></i>
          </div>
        </div>

        {/* Right Section */}
        <div className="contact-right">
          <h3 className="quick-links-title">Quick Links</h3>
          <ul className="quick-links-list">
            <li ><a href="/" onClick={(e) => handleNavigation('/', e)}>Home</a></li>
            <li><a href="/about" onClick={(e) => handleNavigation('/about', e)}>About</a></li>
            <li><a href="/gallery" onClick={(e) => handleNavigation('/gallery', e)}>Gallery</a></li>
            <li><a href="#">T &amp; C</a></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;
