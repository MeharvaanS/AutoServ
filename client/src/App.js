import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Reviews from "./pages/Reviews";
import Gallery from "./pages/Gallery";
import Contact from "./pages/Contact";
import VideoPreloader from './components/VideoPreloader';
import ScrollToTop from './components/ScrollToTop';

const App = () => {
  return (
    <Router>
      <ScrollToTop />
      <VideoPreloader />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer/>
    </Router>
  );
};

export default App;
