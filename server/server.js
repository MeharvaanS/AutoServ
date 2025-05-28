import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import reviewRoutes from "./routes/reviewRoutes.js";
import galleryRouter from "./routes/galleryRouter.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", galleryRouter);

app.get("/api/gallery", async (req, res) => {
  try {
    const cloudName = "ddy1ask4b";
    const tag = "mac-gall";

    // Cloudinary JSON list for the tag
    const url = `https://res.cloudinary.com/${cloudName}/image/list/${tag}.json`;

    const response = await axios.get(url);

    // Map resources, include type to distinguish image/video
    const media = response.data.resources.map((item) => ({
      url: `https://res.cloudinary.com/${cloudName}/${
        item.resource_type === "video" ? "video" : "image"
      }/upload/${item.public_id}.${item.format}`,
      public_id: item.public_id,
      resource_type: item.resource_type, // "image" or "video"
    }));

    res.json(media);
  } catch (err) {
    console.error("Cloudinary fetch error:", err.message);
    res.status(500).json({ error: "Failed to fetch media from Cloudinary." });
  }
});


app.get("/", (req, res) => {
  res.send("Backend server is running!");
});

// Routes
app.use("/reviews", reviewRoutes);

// Database connection
mongoose
  .connect('mongodb://localhost:27017/mechshop', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(5000, () => console.log("Server running on port 5000"));
  })
  .catch((err) => console.error(err));
