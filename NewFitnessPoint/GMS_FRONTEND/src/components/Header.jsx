import Logo from '../assets/gms_logo.png';
import { useNavigate } from "react-router-dom";
import '../css/Header.css';
import { useState, useEffect } from 'react';
import { useLoading } from './LoadingContext'; // Import the loading context

function Header() {
  const [sideNavOpen, setSideNavOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { showLoader, hideLoader } = useLoading(); // Get loading functions
  const navigate = useNavigate();
  
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
    <header className="Hmain-header">
      <div className="Hmain-logo">
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
          <a href="/" onClick={(e) => handleNavigation('/', e)}>Home</a>
          <a href="/about" onClick={(e) => handleNavigation('/about', e)}>About</a>
          <a href="/gallery" onClick={(e) => handleNavigation('/gallery', e)}>Gallery</a>
          <a href="/contact" onClick={(e) => handleNavigation('/contact', e)}>Contact</a>
        </nav>
      ) : (
        <div className={`sidenav ${sideNavOpen ? 'open' : ''}`} id="mobile-nav">
          <button className="closebtn" onClick={closeNav}>&times;</button>
          <div className="sidenav-links">
            <a href="/" onClick={(e) => {
              closeNav();
              handleNavigation('/', e);
            }}>Home</a>
            <a href="/about" onClick={(e) => {
              closeNav();
              handleNavigation('/about', e);
            }}>About</a>
            <a href="/gallery" onClick={(e) => {
              closeNav();
              handleNavigation('/gallery', e);
            }}>Gallery</a>
            <a href="/contact" onClick={(e) => {
              closeNav();
              handleNavigation('/contact', e);
            }}>Contact</a>
          </div>
          <div className="sidenav-footer">
            <a href="/login" onClick={(e) => {
              closeNav();
              handleNavigation('/login', e);
            }} className="sidenav-login-button">Login</a>
          </div>
        </div>
      )}
      
      {/* Only show the header login button on desktop */}
      {!isMobile && (
        <a href="/login" onClick={(e) => handleNavigation('/login', e)} className="Mlogin-button">Login</a>
      )}
    </header>
  );
}

export default Header;