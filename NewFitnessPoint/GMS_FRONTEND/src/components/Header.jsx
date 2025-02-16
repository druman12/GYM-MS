import Logo from '../assets/gms_logo.png';
import { Link } from "react-router-dom";
import '../css/Header.css';

function Header() {
  return (
    <header className="main-header">
      <div className="main-logo">
        <img src={Logo} alt="Fitness Logo" />
      </div>
      <nav className="main-nav">
        <a href="/">Home</a>
        <a href="/about">About</a>
        <Link to="/gallery"> Gallery </Link>
        {/* <a href="/gallery">Gallery</a> */}
        <a href="/contact">Contact</a>
      </nav>
      <Link to="/login" className="Mlogin-button">Login</Link>
    </header>
  );
}

export default Header;
