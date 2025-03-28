import React from "react";
import './Services.css';

// Memoized ServiceItem component to prevent unnecessary re-renders
const ServiceItem = React.memo(({ service }) => (
  <div className="service-item">
    <div className="service-image">
      <img
        src={service.image}
        alt={service.title}
        loading="lazy" // Lazy load images
      />
      <div className="image-overlay"></div>
      <h3 className="service-title">{service.title}</h3>
    </div>
    <div className="service-details">
      <p className="service-description">{service.description}</p>
      <p className="service-price">{service.price}</p>
    </div>
  </div>
));

const Services = () => {
  const services = [
    {
      id: 1,
      title: "Engine Oil / Filter Replacement",
      description: "Includes engine bay inspection. Premium oil only.",
      price: "$120",
      image: "https://images.pexels.com/photos/13065694/pexels-photo-13065694.jpeg?auto=compress&cs=tinysrgb&w=600", // Example image path
    },
    {
      id: 2,
      title: "Oil / Filter Replacement + Tire Rotation",
      description: "Includes engine bay inspection and tire inspection.",
      price: "$160",
      image: "https://images.pexels.com/photos/16341407/pexels-photo-16341407/free-photo-of-pictographs-on-dashboard-in-car.jpeg?auto=compress&cs=tinysrgb&w=1200", // Example image path
    },
    {
      id: 3,
      title: "Oil / Filter Replacement + Tire Rotation + 4-Wheel Brake Service",
      description: "Includes engine bay inspection and tire inspection.",
      price: "$200",
      image: "https://images.pexels.com/photos/30470930/pexels-photo-30470930/free-photo-of-automotive-brake-maintenance-in-workshop.jpeg?auto=compress&cs=tinysrgb&w=600", // Example image path
    },
    {
      id: 4,
      title: "Tire Swap ON & OFF Rim + Rotation",
      description: "Includes brake inspection.",
      price: "ON: $60 | OFF: $100",
      image: "https://images.pexels.com/photos/29527918/pexels-photo-29527918/free-photo-of-luxury-lamborghini-wheel-detail-in-urban-setting.jpeg?auto=compress&cs=tinysrgb&w=600", // Example image path
    },
    {
      id: 5,
      title: "Tire Puncture Repair",
      description: "Quick and reliable tire puncture repair.",
      price: "$40",
      image: "https://images.pexels.com/photos/2922140/pexels-photo-2922140.jpeg?auto=compress&cs=tinysrgb&w=1200", // Example image path
    },
    {
      id: 6,
      title: "Tire Rebalance (x4)",
      description: "Rebalance all four tires for optimal performance.",
      price: "$60",
      image: "https://images.pexels.com/photos/2244746/pexels-photo-2244746.jpeg?auto=compress&cs=tinysrgb&w=600", // Example image path
    },
    {
      id: 7,
      title: "Detailed Clean Up (Base)",
      description: "Outside and inside base cleaning.",
      price: "$100",
      image: "https://images.pexels.com/photos/6873088/pexels-photo-6873088.jpeg?auto=compress&cs=tinysrgb&w=600", // Example image path
    },
    {
      id: 8,
      title: "Detailed Clean Up (Premium)",
      description: "Outside and inside cleaning with seats removed.",
      price: "$140",
      image: "https://images.pexels.com/photos/6873119/pexels-photo-6873119.jpeg?auto=compress&cs=tinysrgb&w=600", // Example image path
    },
    {
      id: 9,
      title: "Detailed Clean Up (Super Clean)",
      description: "Outside, inside, seats removed, engine bay, and underbody cleaning.",
      price: "$180",
      image: "https://images.pexels.com/photos/6872175/pexels-photo-6872175.jpeg?auto=compress&cs=tinysrgb&w=600", // Example image path
    },
  ];

  return (
    <div className="services-page">
      {/* Page Title */}
      <h1 id="services-page-title">Services</h1>

      {/* Services List */}
      <div className="services-list">
        {services.map((service) => (
          <ServiceItem key={service.id} service={service} />
        ))}
      </div>
    </div>
  );
};

export default Services;