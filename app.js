const express = require("express");
// import mongoose
const mongoose = require("mongoose");
//lets us use .env file
require("dotenv").config();

//app
const app = express();

//connects to mongo db using mongoose and connection string specified in .env file
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("DB connected"))
  .catch((err) => console.log("DB CONNECTION ERROR: ", err));

mongoose.connection.on("error", (err) => {
  console.log(`DB connection error: ${err.message}`);
});

//routes
app.get("/", (req, res) => {
  res.send("hello from node with live update using nodemon");
});

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
