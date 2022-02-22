import mongoose from "mongoose";
import dotenv from "dotenv";
import { config } from "./config/config";
import { app } from "./app";

dotenv.config();

const start = async () => {
  const { MONGO_URI, PORT } = config();

  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to db successfully");
  } catch (error) {
    console.error(error);
  }

  app.listen(PORT, () => {
    console.log("app started on port " + PORT);
  });
};

start();
