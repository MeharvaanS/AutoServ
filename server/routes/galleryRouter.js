// galleryRouter.js
import express from "express";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

const CLOUD_NAME = "ddy1ask4b";
const API_KEY = "336696688522912";
const API_SECRET = "process.env.CLOUDINARY_API_SECRET";
const base64Auth = Buffer.from(`${API_KEY}:${API_SECRET}`).toString("base64");

// GET /api/gallery - fetch images by tag "mac-gall"
router.get("/gallery", async (req, res) => {
  try {
    const url = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/resources/search?expression=tags:mac-gall&max_results=100`;

    const response = await axios.get(url, {
      headers: {
        Authorization: `Basic ${base64Auth}`,
      },
    });

    const images = response.data.resources.map((img) => ({
      url: img.secure_url,
      public_id: img.public_id,
    }));

    res.json(images);
  } catch (error) {
    console.error("Cloudinary API error:", error.message);
    res.status(500).json({ error: "Failed to fetch images from Cloudinary." });
  }
});

export default router;
