import React from "react";
import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaTools, FaCogs, FaCar, FaHeart } from "react-icons/fa"; // Import Font Awesome icons
import './About.css'; // Reuse the same CSS file or create a new one if needed

const About = () => {
  const navigate = useNavigate();

  const handleContactClick = () => {
    navigate("/contact");
  };

  const scrollToAboutContent = () => {
    const aboutContent = document.querySelector(".about-content-section");
    if (aboutContent) {
      aboutContent.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="about-container">
      {/* Hero Section */}
      <div className="hero-section">
        <video autoPlay loop muted playsInline className="video-background">
          <source src="/videos/v5.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="intro-box">
          <h1 className="title">About Mac's Shop</h1>
          <p className="subtitle">Where Precision Meets Passion</p>
          <button onClick={scrollToAboutContent} id="intro-button">
            Learn More
          </button>
        </div>
      </div>

      {/* About Content Section */}
      <div className="about-content-section">
        <h2 id="about-title">My Story</h2>
        <div className="about-content">
          <div className="about-item">
            <FaTools className="about-icon" />
            <h3>Who I Am</h3>
            <p class="about-details">
              At Mac's Shop, I am more than just a car repair service. I am a passionate professional
              dedicated to providing the best automotive care. With years of experience and a commitment
              to excellence, I ensure your vehicle is in the best hands.
            </p>
          </div>
          <div className="about-item">
            <FaCogs className="about-icon" />
            <h3>My Mission</h3>
            <p class="about-details">
              My mission is to deliver top-notch automotive services with precision, transparency,
              and trust. I aim to build long-lasting relationships with my customers by offering
              reliable and efficient solutions for all their car needs.
            </p>
          </div>
          <div className="about-item">
            <FaCar className="about-icon" />
            <h3>Why Choose Me?</h3>
            <p class="about-details">
              I stand out because of my attention to detail, state-of-the-art equipment, and a
              customer-first approach. Whether it's a routine check-up or a major repair, I treat
              every vehicle as if it were my own.
            </p>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="values-section">
        <h2 id="values-title">My Core Values</h2>
        <div className="values-grid">
          <div className="value-item">
            <FaHeart className="value-icon" />
            <h3>Passion</h3>
            <p>I love what I do, and it shows in every repair.</p>
          </div>
          <div className="value-item">
            <FaTools className="value-icon" />
            <h3>Expertise</h3>
            <p>Years of experience and cutting-edge technology.</p>
          </div>
          <div className="value-item">
            <FaCogs className="value-icon" />
            <h3>Reliability</h3>
            <p>You can count on me to get the job done right.</p>
          </div>
        </div>
      </div>

      {/* Call-to-Action Section */}
      <div className="cta-section">
        <video autoPlay loop muted playsInline className="cta-video-background">
          <source src="/videos/v6.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="cta-content">
          <h2 className="section-title">Ready to Experience Excellence?</h2>
          <p>Contact me today to schedule your car repair or maintenance.</p>
          <button className="cta-button" onClick={handleContactClick}>
            <FaEnvelope className="icon" />&nbsp;&nbsp;&nbsp;Contact me
          </button>
        </div>
      </div>

      {/* Background Effect */}
      <div className="background-effect"></div>
    </div>
  );
};

export default About;