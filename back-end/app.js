// DEPENDENCIES
const cors = require("cors");
const express = require("express");
const axios = require("axios");
const bookedController = require("./Controllers/bookedcontroller.js");
const checklistController = require("./Controllers/checklistcontroller.js");
const eventsController = require("./Controllers/eventController.js");
const favoritesController = require("./Controllers/favoritescontroller.js");
const usersController = require("./Controllers/usersController");

// CONFIGURATION
const app = express();
const corsOptions = {
  origin: "https://event-ful.adaptable.app",
  credentials: true,
};

// MIDDLEWARE
app.use(cors(corsOptions));
app.use(express.json()); // Parse incoming JSON

// ROUTES
app.get("/", (req, res) => {
  res.send("Hello, world!");
});

app.use("/events", eventsController);
app.use("/checklist", checklistController);
app.use("/favorites", favoritesController);
app.use("/booked", bookedController);
app.use("/users", usersController);

app.get("/proxy-ipstack", async (req, res) => {
  const { ip, accessKey } = req.query;

  try {
    const response = await axios.get(
      `http://api.ipstack.com/${ip}?access_key=${accessKey}`
    );
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: error.message });
  }
});

app.get("*", (req, res) => {
  res.send("Page not found");
});

// EXPORT
module.exports = app;
