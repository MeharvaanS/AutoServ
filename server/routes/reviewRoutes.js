import express from "express";
import Review from "../models/Review.js";

const router = express.Router();

// Get all reviews
router.get("/", async (req, res) => {
  try {
    const reviews = await Review.find();
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Post a new review
router.post("/", async (req, res) => {
  const { name, message, rating } = req.body;
  try {
    const newReview = new Review({ name, message, rating });
    await newReview.save();
    res.status(201).json(newReview);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;
