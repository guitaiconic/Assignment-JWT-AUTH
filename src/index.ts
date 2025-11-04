import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import userRoute from "./route/userRoutes.js";

dotenv.config();
const PORT = process.env.PORT || 8080;
const MONGODB_URL = process.env.MONGODB_URL || "mongodb://localhost:27017/";

//Initializing APP
const app = express();

//Middlewares
app.use(cors());
app.use(express.json());

mongoose
  .connect(MONGODB_URL)
  .then(() => {
    console.log("✅ Connect to MongoDb");
  })
  .catch((err) => {
    console.log("MongoDb connection error", err);
  });

//Mount User Routes
app.use("/api/users", userRoute);

app.listen(PORT, () => {
  console.log(`Server is connect to port ${PORT}`);
});
