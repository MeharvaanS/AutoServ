import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaTools, FaCogs, FaCar, FaHeart, FaChevronDown, FaChevronUp } from "react-icons/fa";
import './About.css';

const About = () => {
  const navigate = useNavigate();
  const [expandedSections, setExpandedSections] = useState({
    who: false,
    mission: false,
    why: false
  });
  const [isVisible, setIsVisible] = useState({
    about1: false,
    about2: false,
    about3: false,
    value1: false,
    value2: false,
    value3: false
  });

  const handleContactClick = () => {
    navigate("/contact");
  };

  const scrollToAboutContent = () => {
    const aboutContent = document.querySelector(".about-content-section");
    if (aboutContent) {
      aboutContent.scrollIntoView({ behavior: "smooth" });
    }
  };

  const toggleExpand = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight;
      
      document.querySelectorAll('.about-item').forEach((item, index) => {
        const itemPosition = item.offsetTop;
        if (scrollPosition > itemPosition + 100) {
          setIsVisible(prev => ({ ...prev, [`about${index + 1}`]: true }));
        }
      });

      document.querySelectorAll('.value-item').forEach((item, index) => {
        const itemPosition = item.offsetTop;
        if (scrollPosition > itemPosition + 100) {
          setIsVisible(prev => ({ ...prev, [`value${index + 1}`]: true }));
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="about-container">
      {/* Hero Section with Image */}
      <div className="hero-section">
        <div className="hero-image-container">
          <img 
            src="/images/about-bg.png" 
            alt="Car repair shop"
            className="hero-image"
          />
        </div>
        <div className="intro-box-about">
          <h1 className="title">Know about us</h1>
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
          <div className={`about-item ${isVisible.about1 ? 'visible' : ''}`}>
            <FaTools className="about-icon" />
            <h3>Who I Am</h3>
            <p className="about-details">
              {expandedSections.who 
                ? "At Mac Auto Comapany, I am more than just a car repair service. I am a passionate professional dedicated to providing the best automotive care. With years of experience and a commitment to excellence, I ensure your vehicle is in the best hands."
                : "At Mac Auto Comapany, I am more than just a car repair service..."}
              <button 
                className="read-more-btn" 
                onClick={() => toggleExpand('who')}
              >
                {expandedSections.who ? <FaChevronUp /> : <FaChevronDown />}
              </button>
            </p>
          </div>
          <div className={`about-item ${isVisible.about2 ? 'visible' : ''}`}>
            <FaCogs className="about-icon" />
            <h3>My Mission</h3>
            <p className="about-details">
              {expandedSections.mission
                ? "My mission is to deliver top-notch automotive services with precision, transparency, and trust. I aim to build long-lasting relationships with my customers by offering reliable and efficient solutions for all their car needs."
                : "My mission is to deliver top-notch automotive services..."}
              <button 
                className="read-more-btn" 
                onClick={() => toggleExpand('mission')}
              >
                {expandedSections.mission ? <FaChevronUp /> : <FaChevronDown />}
              </button>
            </p>
          </div>
          <div className={`about-item ${isVisible.about3 ? 'visible' : ''}`}>
            <FaCar className="about-icon" />
            <h3>Why Choose Me?</h3>
            <p className="about-details">
              {expandedSections.why
                ? "I stand out because of my attention to detail, state-of-the-art equipment, and a customer-first approach. Whether it's a routine check-up or a major repair, I treat every vehicle as if it were my own."
                : "I stand out because of my attention to detail..."}
              <button 
                className="read-more-btn" 
                onClick={() => toggleExpand('why')}
              >
                {expandedSections.why ? <FaChevronUp /> : <FaChevronDown />}
              </button>
            </p>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="values-section">
        <h2 id="values-title">My Core Values</h2>
        <div className="values-grid">
          <div className={`value-item ${isVisible.value1 ? 'visible' : ''}`}>
            <FaHeart className="value-icon" />
            <h3>Passion</h3>
            <p>I love what I do, and it shows in every repair.</p>
          </div>
          <div className={`value-item ${isVisible.value2 ? 'visible' : ''}`}>
            <FaTools className="value-icon" />
            <h3>Expertise</h3>
            <p>Years of experience and cutting-edge technology.</p>
          </div>
          <div className={`value-item ${isVisible.value3 ? 'visible' : ''}`}>
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
    </div>
  );
};

export default About;