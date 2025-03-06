import '../css/ContactSection.css';
import Logo from '../assets/gms_logo.png';
import { useState, useEffect } from 'react';

const ContactSection = () => {
  const [ContactData, setContactData] = useState(null);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/ownerdetails/')  // Replace with your actual API URL
      .then(response => response.json())
      .then(data => setContactData(data))
      .catch(error => console.error('Error fetching hero data:', error));
  }, []);

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
            <li ><a href="/">Home</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/gallery">Gallery</a></li>
            <li><a href="#">T &amp; C</a></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;
