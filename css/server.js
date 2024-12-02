// Firebase Cloud Functions Wrapper

const functions = require("firebase-functions");
const express = require("express");
const axios = require("axios");
require("dotenv").config();

const app = express();

// Middleware
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.send("Welcome to IntelliBase Backend!");
});

// Example AI Model Route
app.post("/api/model", async (req, res) => {
  const { input } = req.body;

  if (!input) {
    return res.status(400).send({ error: "Input is required." });
  }

  try {
    const huggingFaceApiKey = process.env.HUGGING_FACE_API_KEY;
    const response = await axios.post(
      "https://api-inference.huggingface.co/models/gpt-neo-2.7B",
      { inputs: input },
      { headers: { Authorization: `Bearer ${huggingFaceApiKey}` } }
    );

    res.send(response.data);
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ error: "Model inference failed." });
  }
});

// Export the app for Firebase Cloud Functions
exports.api = functions.https.onRequest(app);