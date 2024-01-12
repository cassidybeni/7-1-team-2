// DEPENDENCIES
const cors = require("cors");
const express = require("express");
const bookedController = require("./Controllers/bookedcontroller.js");
const checklistController = require("./Controllers/checklistcontroller.js");
const eventsController = require("./Controllers/eventController.js");
const favoritesController = require("./Controllers/favoritescontroller.js");
const usersController = require("./Controllers/usersController");

// CONFIGURATION
const app = express();

app.use(cors());

// MIDDLEWARE
app.use(express.json()); // Parse incoming JSON

// ROUTES
app.get("/", (req, res) => {
  res.send("Hello, world!");
});

app.get("/proxy/:ip", async (req, res) => {
  const { ip } = req.params;
  const accessKey = process.env.ACCESS_KEY;
  try {
    const response = await axios.get(
      `http://api.ipstack.com/${ip}?access_key=${accessKey}`
    );
    res.json(response.data);
  } catch (e) {
    console.error(e);
    res.status(500).send("error");
  }
});

app.use("/events", eventsController);
app.use("/checklist", checklistController);
app.use("/favorites", favoritesController);
app.use("/booked", bookedController);
app.use("/users", usersController);

app.get("*", (req, res) => {
  res.send("page not found");
});

// EXPORT
module.exports = app;
