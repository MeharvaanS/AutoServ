import React, { useState } from 'react';
import './Contact.css'; // Import the CSS file
import { FaWhatsapp, FaPhone, FaEnvelope } from 'react-icons/fa'; // Icons for WhatsApp and attachment

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    services: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Construct the mailto link
    const subject = encodeURIComponent('New Contact Form Submission');
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nServices: ${formData.services}`
    );

    const mailtoLink = `mailto:macmachado44@gmail.com?subject=${subject}&body=${body}`;

    // Open the default email client
    window.location.href = mailtoLink;

    // Reset form after submission
    setFormData({
      name: '',
      email: '',
      phone: '',
      services: '',
    });
  };

  return (
    <div className="contact-container">
      {/* Video Background */}
      <video autoPlay loop muted className="video-background-contact">
        <source src="/videos/v4.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <h1>Contact me</h1>
      <div className="contact-columns">
        {/* Left Column - Contact Form */}
        <div className="contact-form">
          <h2>Email me!</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name*</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email*</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone*</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="services">What services would you like?*</label>
              <input
                type="text"
                id="services"
                name="services"
                value={formData.services}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit">Send</button>
          </form>
        </div>

        {/* Right Column - WhatsApp Button and Info */}
        <div className="contact-info">
          <h2>Better yet, see us in person!</h2>
          <p>
            Feel free to contact me during normal business hours.
          </p>
          <a
            href="https://wa.me/4162762096"
            className="whatsapp-button"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaWhatsapp className="whatsapp-icon" />
            Message us on WhatsApp
          </a>
          <div className="business-info">
            <p>
              <a href="tel:4162762096">
                <FaPhone className="phone-icon" />
                &nbsp;&nbsp; (416) 276-2096
              </a>
            </p>
            <br></br>
            <p>
              <a href="mailto:macmachado44@gmail.com">
                <FaEnvelope className="mail-icon" />
                &nbsp;&nbsp;macmachado44@gmail.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;