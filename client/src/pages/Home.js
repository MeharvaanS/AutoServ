import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaChevronLeft, FaStar, FaTools, FaChevronRight, FaEnvelope, FaCar, FaBatteryFull } from "react-icons/fa";
import './Home.css';

const Home = () => {
  const navigate = useNavigate();
  const [reviews, setReviews] = useState([]);
  const servicesCardsRef = useRef(null);
  const [areCardsVisible, setAreCardsVisible] = useState(false);

  // Set up intersection observer for services cards
  useEffect(() => {
    const currentRef = servicesCardsRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setAreCardsVisible(true);
          } else {
            if (entry.boundingClientRect.top > 0) {
              setAreCardsVisible(false);
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  const scrollToServiceContent = () => {
    const aboutContent = document.querySelector(".services-section");
    if (aboutContent) {
      aboutContent.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollTestimonials = (scrollOffset) => {
    const container = document.querySelector(".testimonials-container");
    if (container) {
      container.scrollBy({
        left: scrollOffset,
        behavior: "smooth",
      });
    }
  };

  // Fetch reviews from the backend
  useEffect(() => {
    axios.get("http://192.168.0.22:5000/reviews")
      .then((res) => setReviews(res.data))
      .catch((error) => console.error("Error fetching reviews:", error));
  }, []);

  // Helper function to render stars based on rating
  const renderStars = (rating) => {
    const fullStars = "⭐".repeat(rating);
    const emptyStars = "☆".repeat(5 - rating);
    return fullStars + emptyStars;
  };

  const handleExploreClick = () => {
    navigate("/services");
  };

  const handleReviewClick = () => {
    navigate("/reviews");
  };

  const handleContactClick = () => {
    navigate("/contact");
  };

  return (
    <div className="home-container">
      {/* Hero Section */}
      <div className="hero-section">
        <video autoPlay loop muted playsInline className="video-background-home">
          <source src="/videos/v1.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="intro-box">
          <h1 className="title">Welcome to M.A.C</h1>
          <p className="subtitle">Precision under the hood, trust at the wheel</p>
          <button onClick={scrollToServiceContent} id="intro-button">Get started</button>
        </div>
      </div>

      {/* Services Section */}
      <div className="services-section">
        <h2 id="services-title">Our Services</h2>
        <div 
          ref={servicesCardsRef} 
          className={`services-grid ${areCardsVisible ? 'visible' : ''}`}
        >
          <div className="service-card">
            <div className="service-icon"><FaTools className="icon-serv" /></div>
            <h3>General Repairs</h3>
            <p>From brake checks to engine tune-ups, we handle it all.</p>
          </div>
          <div className="service-card">
            <div className="service-icon"><FaCar className="icon-serv" /></div>
            <h3>Car Maintenance</h3>
            <p>Regular maintenance to keep your car running smoothly.</p>
          </div>
          <div className="service-card">
            <div className="service-icon"><FaBatteryFull className="icon-serv" /></div>
            <h3>Battery Replacement</h3>
            <p>Get your car battery replaced quickly and efficiently.</p>
          </div>
        </div>
        <button id="service-button" onClick={handleExploreClick}>
          <FaTools className="icon" />&nbsp;&nbsp;&nbsp;Find out more
        </button>
      </div>

      {/* Testimonials Section */}
      <div className="testimonials-section">
        <h2 id="review-title-home">What Our Customers Say</h2>
        <div className="testimonials-scroll-wrapper">
          <button className="scroll-button left" onClick={() => scrollTestimonials(-300)}>
            <FaChevronLeft />
          </button>

          <div className="testimonials-container">
            <div className="testimonials-grid">
              {reviews.map((review, index) => (
                <div className="testimonial-card" key={index}>
                  <p className="review-rating">{renderStars(review.rating)}</p>
                  <p>
                    {review.message} ~<em>{review.name}</em>
                  </p>
                  <p className="review-date">
                    {review.createdAt ? review.createdAt.split("T")[0] : "No date available"}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <button className="scroll-button right" onClick={() => scrollTestimonials(300)}>
            <FaChevronRight />
          </button>
        </div>
        <button id="review-button" onClick={handleReviewClick}>
          <FaStar className="icon" />&nbsp;&nbsp;&nbsp;Leave a review
        </button>
      </div>

      {/* Call-to-Action Section */}
      <div className="cta-section">
        <video autoPlay loop muted playsInline className="cta-video-background">
          <source src="/videos/v6.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="cta-content">
          <h2 className="section-title">Ready to Get Started?</h2>
          <p>Contact me today to schedule your car repair or maintenance.</p>
          <button className="cta-button" onClick={handleContactClick}>
            <FaEnvelope className="icon" />&nbsp;&nbsp;&nbsp;Contact me
          </button>
        </div>
      </div>

      <div className="background-effect"></div>
    </div>
  );
};

export default Home;