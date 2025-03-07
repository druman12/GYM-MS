import Logo from '../../assets/gms_logo.png';
import { Link , useNavigate } from "react-router-dom";
import '../../css/AboutHeader.css';
import { useState, useEffect } from 'react';
import { useLoading } from '../LoadingContext'; // Import the loading context


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
    <header className="Amain-header">
      <div className="main-logo">
        <img src={Logo} alt="Fitness Logo" />
      </div>
      
      {/* Hamburger menu button only displayed on mobile */}
      {isMobile && (
        <button className="Amenu-toggle" onClick={openNav}>
          ☰
        </button>
      )}
      
      {/* Regular navigation for desktop */}
      {!isMobile ? (
        <nav className="Amain-nav desktop-nav">
          <a href="/" onClick={(e) => handleNavigation('/', e)}>Home</a>
          <a href="/about" onClick={(e) => handleNavigation('/about', e)}>About</a>
          <Link to="/gallery" onClick={(e) => handleNavigation('/gallery', e)}>Gallery</Link>
          <a href="/contact" onClick={(e) => handleNavigation('/contact', e)}>Contact</a>
        </nav>
      ) : (
        <div className={`Asidenav ${sideNavOpen ? 'open' : ''}`} id="mobile-nav">
          <button className="closebtn" onClick={closeNav}>&times;</button>
          <div className="Asidenav-links">
            <a href="/" onClick={(e) => {
              closeNav();
              handleNavigation('/', e);
            }}>Home</a>
            <a href="/about" onClick={(e) => {
              closeNav();
              handleNavigation('/about', e);
            }}>About</a>
            <Link to="/gallery" onClick={(e) => {
              closeNav();
              handleNavigation('/gallery', e);
            }}>Gallery</Link>
            <a href="/contact" onClick={(e) => {
              closeNav();
              handleNavigation('/contact', e);
            }}>Contact</a>
          </div>
          <div className="Asidenav-footer">
            <Link to="/login" className="Asidenav-login-button" onClick={(e) => {
              handleNavigation('/login', e);
            }}>Login</Link>
          </div>
        </div>
      )}
      
      {/* Only show the header login button on desktop */}
      {!isMobile && (
        <Link to="/login" className="AMlogin-button">Login</Link>
      )}
    </header>
  );
}

export default Header;