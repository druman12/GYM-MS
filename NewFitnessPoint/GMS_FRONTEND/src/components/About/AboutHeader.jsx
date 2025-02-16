import Logo from '../../assets/gms_logo.png';
import { Link } from "react-router-dom";
import '../../css/AboutHeader.css';

function AboutHeader() {
  return (
    <header className="about-header">
      <div className="about-logo">
        <img src={Logo} alt="Fitness Logo" />
      </div>
      <nav className="about-nav">
        <a href="/">Home</a>
        <a href="/about">About</a>
        <a href="/gallery">Gallery</a>
        <a href="/contact">Contact</a>
      </nav>
      <Link to="/login" className="Alogin-button">Login</Link>
    </header>
  );
}

export default AboutHeader;
