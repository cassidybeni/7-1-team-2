// DEPENDENCIES
const cors = require("cors");
const express = require("express");
const bookedController = require("./Controllers/bookedcontroller.js")
const checklistController = require("./Controllers/checklistcontroller.js")
const eventsController = require("./Controllers/eventController.js")
const favoritesController = require("./Controllers/favoritescontroller.js")
const usersController = require("./Controllers/usersController")


// CONFIGURATION
const app = express();

app.use(cors({
  origin: "https://eventful-capstone.netlify.app",
  methods: 'GET,POST,UPDATE,DELETE',
}));

// MIDDLEWARE
app.use(cors());
app.use(express.json()); // Parse incoming JSON

// ROUTES
app.get("/", (req, res) => {
  res.send("Hello, world!");
});

app.use("/events", eventsController)

app.use("/checklist", checklistController)

app.use("/favorites", favoritesController)

app.use("/booked", bookedController)

app.use("/users", usersController)


app.get("*", (req,res)=>{
  res.send("page not found")
})


// EXPORT
module.exports = app;
