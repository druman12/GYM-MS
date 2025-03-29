import Logo from '../assets/gms_logo.png';
import { useNavigate } from "react-router-dom";
import '../css/Header.css';
import { useState, useEffect, useRef } from 'react';
import { useLoading } from './LoadingContext'; // Import the loading context

function Header() {
  const [sideNavOpen, setSideNavOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { showLoader, hideLoader } = useLoading(); // Get loading functions
  const navigate = useNavigate();
  const sideNavRef = useRef(null); // Ref for side nav

  // Check if screen is mobile size
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 525);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => {
      window.removeEventListener('resize', checkScreenSize);
    };
  }, []);

  // Close menu on outside click
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (sideNavOpen && sideNavRef.current && !sideNavRef.current.contains(e.target)) {
        setSideNavOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [sideNavOpen]);

  const openNav = () => setSideNavOpen(true);
  const closeNav = () => setSideNavOpen(false);

  // Function to handle navigation with loading state
  const handleNavigation = (path, e) => {
    e.preventDefault();
    showLoader(); // Show loader before navigation

    setTimeout(() => {
      navigate(path);
      hideLoader(); // Hide loader after navigation
    }, 500);
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
        <div
          ref={sideNavRef}
          className={`sidenav ${sideNavOpen ? 'open' : ''}`}
          id="mobile-nav"
        >
          <button className="closebtn" onClick={closeNav}>&times;</button>
          <div className="sidenav-links">
            {['/', '/about', '/gallery', '/contact'].map((path, index) => (
              <a key={index} href={path} onClick={(e) => {
                closeNav();
                handleNavigation(path, e);
              }}>
                {path.slice(1).charAt(0).toUpperCase() + path.slice(2) || 'Home'}
              </a>
            ))}
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
