import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaChevronLeft, FaStar, FaTools, FaChevronRight, FaEnvelope, FaCar, FaPaintRoller, FaTimes, FaSearch } from "react-icons/fa";
import './Home.css';

const Home = () => {
  const navigate = useNavigate();
  const [reviews, setReviews] = useState([]);
  const servicesCardsRef = useRef(null);
  const [areCardsVisible, setAreCardsVisible] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Service data
  const services = [
    {
      id: 'repairs',
      title: 'General Repairs',
      icon: <FaTools className="icon-serv" />,
      fullText: "Unexpected repairs can be costly and stressful, especially when maintenance is overlooked. At M.A.C, we've got you covered. Once an issue is identified, we ensure a swift, safe, and cost-effective repair process-guaranteed to provide the best value."
    },
    {
      id: 'maintenance',
      title: 'Car Maintenance',
      icon: <FaCar className="icon-serv" />,
      fullText: "Attention to detail is essential at every stage of your vehicle's life to ensure it remains safe, smooth, and reliable. Regular maintenance helps prevent costly repairs and keeps your car performing at its best."
    },
    {
      id: 'bodyPaint',
      title: 'Body & Paint Repair',
      icon: <FaPaintRoller className="icon-serv" />,
      fullText: "Driving in Canada can be tough-harsh winters, road salt, and unpredictable drivers can take a toll on your vehicle's appearance. Whether it's rust damage or an unexpected fender bender on the 401, M.A.C has you covered. Our body and paint repair services will restore your vehicle to its original showroom shine."
    },
    {
      id: 'details',
      title: 'Attention To Details',
      icon: <FaSearch className="icon-serv" />,
      fullText: "At M.A.C, attention to detail is our priority. We go beyond maintenance and repairs by offering professional interior and exterior cleanup services. From routine servicing to keeping your vehicle looking its best, M.A.C is your one-stop shop for all your automotive needs!"
    }
  ];

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

  const openModal = (serviceId) => {
    setSelectedService(services.find(service => service.id === serviceId));
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedService(null);
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
        <div className="services-scroll-wrapper">
          <div 
            ref={servicesCardsRef} 
            className={`services-grid ${areCardsVisible ? 'visible' : ''}`}
          >
            {services.map((service) => (
              <div className="service-card" key={service.id}>
                <div className="service-icon">{service.icon}</div>
                <h3>{service.title}</h3>
                <button 
                  className="read-more-btn-home" 
                  onClick={() => openModal(service.id)}
                >
                  See Details <FaChevronRight className="read-more-icon" />
                </button>
              </div>
            ))}
          </div>
        </div>
        <button id="service-button" onClick={handleExploreClick}>
          <FaTools className="icon" />&nbsp;&nbsp;&nbsp;Find out more
        </button>
      </div>

      {/* Testimonials Section */}
      <div className="testimonials-section">
        <h2 id="review-title-home">Customer Reviews</h2>
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
          <p>Contact us today to schedule your car repair or maintenance.</p>
          <button className="cta-button" onClick={handleContactClick}>
            <FaEnvelope className="icon" />&nbsp;&nbsp;&nbsp;Contact us
          </button>
        </div>
      </div>

      {/* Service Modal */}
      {isModalOpen && selectedService && (
        <div className="service-modal-overlay">
          <div className="service-modal">
            <button className="modal-close-btn" onClick={closeModal}>
              <FaTimes />
            </button>
            <div className="modal-icon">{selectedService.icon}</div>
            <h3 className="modal-title">{selectedService.title}</h3>
            <p className="modal-description">{selectedService.fullText}</p>
            <button class="modal-button" onClick={handleExploreClick}>
          <FaTools className="icon" />&nbsp;&nbsp;&nbsp;Find out more
        </button>
          </div>
        </div>
      )}

      <div className="background-effect"></div>
    </div>
  );
};

export default Home;