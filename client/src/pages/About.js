import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaTools, FaCogs, FaCar, FaHeart, FaChevronDown, FaChevronUp, FaVolumeUp, FaVolumeMute } from "react-icons/fa";
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
  const [speakingSection, setSpeakingSection] = useState(null);
  const [speechSynthesis, setSpeechSynthesis] = useState(null);
  const [voicesLoaded, setVoicesLoaded] = useState(false);
  const [voicesError, setVoicesError] = useState(false);

  useEffect(() => {
    if ('speechSynthesis' in window) {
      const synth = window.speechSynthesis;
      setSpeechSynthesis(synth);
      
      const loadVoices = () => {
        try {
          const voices = synth.getVoices();
          if (voices.length > 0) {
            console.log("Available voices:", voices);
            setVoicesLoaded(true);
            setVoicesError(false);
          } else {
            setVoicesError(true);
          }
        } catch (error) {
          console.error("Error loading voices:", error);
          setVoicesError(true);
        }
      };
      
      synth.onvoiceschanged = loadVoices;
      loadVoices();
      
      return () => {
        synth.onvoiceschanged = null;
        if (synth.speaking) {
          synth.cancel();
        }
      };
    } else {
      setVoicesError(true);
    }
  }, []);

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

  const toggleSpeech = (section) => {
    if (!speechSynthesis || !voicesLoaded) {
      if (voicesError) {
        alert("Text-to-speech is not available in your browser");
      }
      return;
    }

    if (speechSynthesis.speaking) {
      speechSynthesis.cancel();
      if (speakingSection === section) {
        setSpeakingSection(null);
        return;
      }
    }

    let textToSpeak = '';
    switch (section) {
      case 'who':
        textToSpeak = "Hey there! The name's Mac Machado, and I'll be the one taking care of all your automotive needs here at M.A.C. At Mac Auto Company, we take pride in the quality of our work and pay close attention to every detail just like you'd expect from someone who truly cares about your vehicle. Whether it's routine maintenance, general repairs, bodywork and refinishing, or even full interior and exterior detailing-we've got you covered. We're your one-stop shop for everything automotive.";
        break;
      case 'mission':
        textToSpeak = "At Mac Auto Company, my mission is simple-treat every vehicle like it's my own and every customer like family. I'm building this business with honesty, precision, and a real passion for the trade. No cutting corners, no upselling-just solid, dependable work from someone who genuinely cares about keeping your car in top shape.";
        break;
      case 'why':
        textToSpeak = "When you come to M.A.C, you're not just another number in a queue. Unlike the dealerships, Mr.Lube, or Midas, I personally handle your car with the attention and respect it deserves. You'll always deal directly with the technician—me—and that means clear communication, fair pricing, and quality you can trust. I bring dealership-level knowledge without the dealership-level prices. Here, it's personal-and that's the M.A.C difference.";
        break;
      default:
        return;
    }

    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    const voices = speechSynthesis.getVoices();

    // Enhanced male voice selection
    let selectedVoice = null;
    
    // Priority list of male voice identifiers
    const maleVoicePriorityList = [
      { name: 'Microsoft David', lang: 'en-US' },
      { name: 'Google US English Male', lang: 'en-US' },
      { name: 'Alex', lang: 'en-US' },
      { name: 'Daniel', lang: 'en-GB' },
      { name: 'Fred', lang: 'en-US' },
      { name: 'Microsoft Mark', lang: 'en-US' },
      { name: 'Google UK English Male', lang: 'en-GB' },
      { name: 'Google Australia English Male', lang: 'en-AU' }
    ];

    // Try to find exact matches first
    for (const preferredVoice of maleVoicePriorityList) {
      const foundVoice = voices.find(voice => 
        voice.name === preferredVoice.name && 
        voice.lang.includes(preferredVoice.lang))
      if (foundVoice) {
        selectedVoice = foundVoice;
        break;
      }
    }

    // Fallback to any male-sounding voice
    if (!selectedVoice) {
      selectedVoice = voices.find(voice => {
        const lowerName = voice.name.toLowerCase();
        return (
          lowerName.includes('male') || 
          lowerName.includes('man') ||
          lowerName.includes('david') ||
          lowerName.includes('daniel') ||
          lowerName.includes('mark') ||
          lowerName.includes('paul') ||
          lowerName.includes('fred') ||
          lowerName.includes('alex')
        );
      });
    }

    // Final fallback to any English voice
    if (!selectedVoice) {
      selectedVoice = voices.find(voice => voice.lang.includes('en')) || voices[0];
    }

    if (selectedVoice) {
      utterance.voice = selectedVoice;
      console.log("Using voice:", selectedVoice.name);
      
      // Natural speech parameters
      utterance.rate = 0.98;
      utterance.pitch = 0.92;
      utterance.volume = 1.0;
      
      // Add pauses for natural speech
      utterance.text = utterance.text
        .replace(/\. /g, '.  ')
        .replace(/, /g, ',  ');
    }

    // Add subtle pitch variations
    utterance.onboundary = (event) => {
      if (event.name === 'word') {
        utterance.pitch = 0.9 + Math.random() * 0.05;
      }
    };

    utterance.onend = () => setSpeakingSection(null);
    utterance.onerror = () => setSpeakingSection(null);

    speechSynthesis.speak(utterance);
    setSpeakingSection(section);
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
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (speechSynthesis && speechSynthesis.speaking) {
        speechSynthesis.cancel();
      }
    };
  }, [speechSynthesis]);

  return (
    <div className="about-container">
      {/* Hero Section */}
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
            <div className="about-header">
              <FaTools className="about-icon" />
              <h3>About M.A.C 
                <button 
                  className="speaker-btn"
                  onClick={() => toggleSpeech('who')}
                  aria-label="Read section aloud"
                  disabled={!voicesLoaded || voicesError}
                >
                  {speakingSection === 'who' ? <FaVolumeMute /> : <FaVolumeUp />}
                </button>
              </h3>
            </div>
            <p className="about-details">
              {expandedSections.who 
                ? "Hey there! The name's Mac Machado, and I'll be the one taking care of all your automotive needs here at M.A.C. At Mac Auto Company, we take pride in the quality of our work and pay close attention to every detail just like you'd expect from someone who truly cares about your vehicle. Whether it's routine maintenance, general repairs, bodywork and refinishing, or even full interior and exterior detailing-we've got you covered. We're your one-stop shop for everything automotive."
                : "Hey there! The name's Mac Machado, and I'll be the one..."}
              <button 
                className="read-more-btn" 
                onClick={() => toggleExpand('who')}
                aria-label={expandedSections.who ? "Show less" : "Show more"}
              >
                {expandedSections.who ? <FaChevronUp /> : <FaChevronDown />}
              </button>
            </p>
          </div>
          <div className={`about-item ${isVisible.about2 ? 'visible' : ''}`}>
            <div className="about-header">
              <FaCogs className="about-icon" />
              <h3>Our Mission 
                <button 
                  className="speaker-btn"
                  onClick={() => toggleSpeech('mission')}
                  aria-label="Read section aloud"
                  disabled={!voicesLoaded || voicesError}
                >
                  {speakingSection === 'mission' ? <FaVolumeMute /> : <FaVolumeUp />}
                </button>
              </h3>
            </div>
            <p className="about-details">
              {expandedSections.mission
                ? "At Mac Auto Company, my mission is simple-treat every vehicle like it's my own and every customer like family. I'm building this business with honesty, precision, and a real passion for the trade. No cutting corners, no upselling-just solid, dependable work from someone who genuinely cares about keeping your car in top shape."
                : "At Mac Auto Company, my mission is simple-treat..."}
              <button 
                className="read-more-btn" 
                onClick={() => toggleExpand('mission')}
                aria-label={expandedSections.mission ? "Show less" : "Show more"}
              >
                {expandedSections.mission ? <FaChevronUp /> : <FaChevronDown />}
              </button>
            </p>
          </div>
          <div className={`about-item ${isVisible.about3 ? 'visible' : ''}`}>
            <div className="about-header">
              <FaCar className="about-icon" />
              <h3>Why Me? 
                <button 
                  className="speaker-btn"
                  onClick={() => toggleSpeech('why')}
                  aria-label="Read section aloud"
                  disabled={!voicesLoaded || voicesError}
                >
                  {speakingSection === 'why' ? <FaVolumeMute /> : <FaVolumeUp />}
                </button>
              </h3>
            </div>
            <p className="about-details">
              {expandedSections.why
                ? "When you come to M.A.C, you're not just another number in a queue. Unlike the dealerships, Mr.Lube, or Midas, I personally handle your car with the attention and respect it deserves. You'll always deal directly with the technician—me—and that means clear communication, fair pricing, and quality you can trust. I bring dealership-level knowledge without the dealership-level prices. Here, it's personal-and that's the M.A.C difference."
                : "When you come to M.A.C, you're not just another number..."}
              <button 
                className="read-more-btn" 
                onClick={() => toggleExpand('why')}
                aria-label={expandedSections.why ? "Show less" : "Show more"}
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
            <p>We love what I do, and it shows in every repair.</p>
          </div>
          <div className={`value-item ${isVisible.value2 ? 'visible' : ''}`}>
            <FaTools className="value-icon" />
            <h3>Expertise</h3>
            <p>Years of experience and cutting-edge technology.</p>
          </div>
          <div className={`value-item ${isVisible.value3 ? 'visible' : ''}`}>
            <FaCogs className="value-icon" />
            <h3>Reliability</h3>
            <p>You can count on us to get the job done right.</p>
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
          <p>Contact us today to schedule your car repair or maintenance.</p>
          <button className="cta-button" onClick={handleContactClick}>
            <FaEnvelope className="icon" />&nbsp;&nbsp;&nbsp;Contact us
          </button>
        </div>
      </div>
    </div>
  );
};

export default About;