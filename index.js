import express from "express"
import dotenv from "dotenv"
import connectDB from ".config/db.js"
import cors from "cors"
import path from "path"
import colors from "colors"
import userRoutes from "./routes/userRoutes"

dotenv.config()

// Connect DB
connectDB()

const app = express();

app.use(cors());
// Body parser
app.use(express.json());

// Routes
app.use("/api/user", userRoutes);

// Serve static assets (build folder) if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));
// get anything, load index.html file
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

app.use(errorHandler)

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server Running in ${process.env.NODE_DEV} mode on port ${PORT}`.yellow.bold));
// prod false bcz  it will not run build script if its in prod, once its done it will be in prod

// login heroku , create new app
