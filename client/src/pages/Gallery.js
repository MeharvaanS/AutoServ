import React, { useState, useEffect } from "react";
import "./Gallery.css";

function FadeInImage({ src, alt }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      onLoad={() => setLoaded(true)}
      className={loaded ? "loaded" : ""}
    />
  );
}


function Gallery() {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
   fetch('http://localhost:5000/api/gallery')
      .then((res) => res.json())
      .then((data) => setImages(data))
      .catch((err) => console.error("Error fetching images:", err));
  }, []);

  // Filter images by public_id (or you can use other metadata)
  const filtered = images.filter((img) =>
    img.public_id.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="gallery-container">
      <h1 class="gall-title">Car Gallery</h1>
      <input
        type="text"
        placeholder="Search your number plate or car name..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="gallery-search"
      />
      <div className="gallery-grid">
        {filtered.map((img, idx) => (
          <FadeInImage key={idx} src={img.url} alt={img.public_id} />
        ))}
      </div>

    </div>
  );
}

export default Gallery;
