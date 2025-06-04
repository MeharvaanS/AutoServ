import React, { useState, useEffect, useRef } from 'react';
import './Contact.css';
import { FaWhatsapp, FaPhone, FaEnvelope } from 'react-icons/fa';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    services: '',
  });

  const formRef = useRef(null);
  const infoRef = useRef(null);
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const formCurrent = formRef.current;
    const infoCurrent = infoRef.current;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setAnimated(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (formCurrent) observer.observe(formCurrent);
    if (infoCurrent) observer.observe(infoCurrent);

    return () => {
      if (formCurrent) observer.unobserve(formCurrent);
      if (infoCurrent) observer.unobserve(infoCurrent);
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const subject = encodeURIComponent('New Contact Form Submission');
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nServices: ${formData.services}`
    );

    const mailtoLink = `mailto:mac@macautocompany.ca?subject=${subject}&body=${body}`;
    window.location.href = mailtoLink;

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
      <div className="video-section">
        <video autoPlay loop muted playsInline className="video-background-contact" controls={false}>
          <source src="/videos/v5.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="overlay"></div>
      </div>

      <h1>Contact us</h1>
      <div className="contact-columns">
        {/* Left Column - Contact Form (slides from left) */}
        <div 
          ref={formRef} 
          className={`contact-form ${animated ? 'animate-left' : ''}`}
        >
          <h2>Email us!</h2>
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

        {/* Right Column - Contact Info (slides from right) */}
        <div 
          ref={infoRef} 
          className={`contact-info ${animated ? 'animate-right' : ''}`}
        >
          <h2>Better yet, see us in person!</h2>
          <p>Feel free to contact me during normal business hours.</p>
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
              <a href="mailto:mac@macautocompany.ca">
                <FaEnvelope className="mail-icon" />
                &nbsp;&nbsp;mac@macautocompany.ca
              </a>
            </p>
          </div>
        </div>
      </div>
      <iframe
        title="Google Map"
        src="https://www.google.com/maps?q=1013+Dundas+Street+West,+Oakville,+ON&output=embed"
        style={{
          width: '100%',
          height: '450px',
          marginTop: '80px',
          marginBottom: '-30px',
          border: 0,
          filter: 'invert(120%) hue-rotate(580deg) contrast(130%)'
        }}
        allowFullScreen
        loading="lazy"
      />
  </div>
  );
}

export default Contact;