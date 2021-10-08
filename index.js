import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import cors from "cors"
import path from "path"
import colors from "colors"
import userRoutes from "./routes/userRoutes.js"
import adminRoutes from "./routes/adminRoutes.js"
import contactRoute from "./routes/contact.js"
import { errorHandler, notFound } from "./middleware/errorMiddleware.js"

dotenv.config()

// Connect DB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log("MongoDB is connected"))
  .catch((err) => console.log(err));

const app = express();

app.use(cors());
// Body parser
app.use(express.json());

// Routes
app.use("/api/user", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/send", contactRoute);

// Serve static assets (build folder) if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));
// get anything, load index.html file
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server Running in ${process.env.NODE_DEV} mode on port ${PORT}`.yellow.bold));
// prod false bcz  it will not run build script if its in prod, once its done it will be in prod

// login heroku , create new app
