const express = require("express");
const app = express();

app.use(express.json());

//Importing Routes
const product = require("./routes/productRoute");

app.use("/api/v1", product);

//Middleware for Errors
const errorMiddleware = require("./middleware/error");
app.use(errorMiddleware);

module.exports = app;