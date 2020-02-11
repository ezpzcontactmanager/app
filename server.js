require('dotenv').config()
const express = require("express");
const bodyParser = require("body-parser");
const user = require("./backend/routes/user");
const contacts = require("./backend/routes/contacts");
const InitiateMongoServer = require("./backend/config/db");

InitiateMongoServer();

const app = express();

// PORT
const PORT =  5000;

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header('Access-Control-Allow-Methods: GET, POST, PUT, OPTIONS, UPDATE, DELETE');
  next();
});

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.json({ message: "API Working" });
});

app.use("/", user);
app.use("/me/contacts", contacts)

app.listen(PORT, (req, res) => {
  console.log(`Server Started at PORT ${PORT}`);
});