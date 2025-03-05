import Logo from '../assets/gms_logo.png';
import { Link } from "react-router-dom";
import '../css/Header.css';
import { useState, useEffect } from 'react';

function Header() {
  const [sideNavOpen, setSideNavOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  // Check if screen is mobile size
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 525);
    };
    
    // Initial check
    checkScreenSize();
    
    // Add event listener for window resize
    window.addEventListener('resize', checkScreenSize);
    
    // Clean up
    return () => {
      window.removeEventListener('resize', checkScreenSize);
    };
  }, []);
  
  function openNav() {
    setSideNavOpen(true);
  }
  
  function closeNav() {
    setSideNavOpen(false);
  }
  
  return (
    <header className="main-header">
      <div className="main-logo">
        <img src={Logo} alt="Fitness Logo" />
      </div>
      
      {/* Hamburger menu button only displayed on mobile */}
      {isMobile && (
        <button className="menu-toggle" onClick={openNav}>
          ☰
        </button>
      )}
      
      {/* Regular navigation for desktop */}
      {!isMobile ? (
        <nav className="main-nav desktop-nav">
          <a href="/">Home</a>
          <a href="/about">About</a>
          <Link to="/gallery">Gallery</Link>
          <a href="/contact">Contact</a>
        </nav>
      ) : (
        <div className={`sidenav ${sideNavOpen ? 'open' : ''}`} id="mobile-nav">
          <button className="closebtn" onClick={closeNav}>&times;</button>
          <div className="sidenav-links">
            <a href="/">Home</a>
            <a href="/about">About</a>
            <Link to="/gallery">Gallery</Link>
            <a href="/contact">Contact</a>
          </div>
          <div className="sidenav-footer">
            <Link to="/login" className="sidenav-login-button">Login</Link>
          </div>
        </div>
      )}
      
      {/* Only show the header login button on desktop */}
      {!isMobile && (
        <Link to="/login" className="Mlogin-button">Login</Link>
      )}
    </header>
  );
}

export default Header;