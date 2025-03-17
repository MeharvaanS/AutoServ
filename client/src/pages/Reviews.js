import React, { useState } from "react";
import axios from "axios";
import { FaStar } from "react-icons/fa"; // Import Font Awesome icons
import './Reviews.css'; // Updated CSS file

function Reviews() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(5);

  const scrollToReviewContent = () => {
    const aboutContent = document.querySelector(".review-form-section");
    if (aboutContent) {
      aboutContent.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Submit a new review
  const submitReview = () => {
    const payload = { name, message, rating: Number(rating) };
    axios.post("http://localhost:5000/reviews", payload)
      .then(() => {
        window.location.reload(); // Reload the page to show the new review
      })
      .catch((error) => {
        console.error("Error submitting review:", error.response?.data || error.message);
      });
  };

  return (
    <div className="reviews-container">
      {/* Hero Section with Video Background */}
      <div className="title-section">
        <video autoPlay loop muted playsInline className="video-background-review">
          <source src="/videos/v3.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="intro-box">
          <h1 className="title">Customer Reviews</h1>
          <p className="subtitle">Share your experience with me</p>
          <button onClick={scrollToReviewContent} id="review-button-scroll">Review my work</button>
        </div>
      </div>

      {/* Review Form Section */}
      <div className="review-form-section">
        <div className="form-container">
          <h2 id="review-title">Leave a Review</h2>
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="form-input"
          />
          <textarea
            placeholder="Your Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="form-textarea"
          />
          <div className="rating-container">
            <div className="star-rating">
              {[...Array(5)].map((_, index) => (
                <FaStar
                  key={index}
                  className={index < rating ? "star active" : "star"}
                  onClick={() => setRating(index + 1)}
                />
              ))}
            </div>
          </div>
          <button onClick={submitReview} className="submit-button">
            <FaStar className="icon" />&nbsp;&nbsp;&nbsp;Submit Review
          </button>
        </div>
      </div>
    </div>
  );
}

export default Reviews;