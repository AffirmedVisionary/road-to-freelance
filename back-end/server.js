
const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");

//bring routes
const authRoutes = require("./routes/authRoutes");
const blogRoutes = require("./routes/blogRoutes");
const userRoutes = require("./routes/userRoutes");

//app
const app = express();

//database connect
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
  })
  .then(() => console.log("DB Connected")).catch = (err) => {
  console.log(err.message);
};

//middleware
app.use(morgan("dev"));
app.use(express.urlencoded())
app.use(express.json())
app.use(cookieParser());

//cors
if (process.env.NODE_ENV == "development") {
  app.use(cors({ origin: `${process.env.CLIENT_URL}` }));
}

//routes middleware
app.use("/api", blogRoutes);
app.use("/api", authRoutes);
app.use("/api", userRoutes);

//port
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Your server is running on port ${port}`);
});
