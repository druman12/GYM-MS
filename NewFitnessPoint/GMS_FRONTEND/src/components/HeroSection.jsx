import '../css/HeroSection.css';
import insta from '../assets/instragram.png';
import fashbook from '../assets/fashbook.png';
import x from '../assets/x.png';

function HeroSection() {
  return (
    <section className="hero-section">
      <div className="overlay"></div>
      <div className="hero-content">
        <h1>NEW <span className="highlight">FITNESS</span>POINT</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt</p>
        <div className="social-icons">
          <a href="#"><img src={x} alt="Twitter" /></a>
          <a href="#"><img src={fashbook} alt="Facebook" /></a>
          <a href="#"><img src={insta} alt="Instagram" /></a>
        </div>
      </div>
      <div className="content-right">
        <div className="right-banner">
          <p>Figma Ipsum Component</p>
          <p>Variant Main</p>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
