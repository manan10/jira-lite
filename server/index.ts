import dotenv from "dotenv";
import express, { Request, Response } from "express";
import mongoose from "mongoose";
import cors from "cors";

import taskRoutes from "./routes/taskRoutes";
import authRoutes from "./routes/authRoutes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err: Error) => console.error("❌ MongoDB Connection Error:", err));
  
app.use("/api/tasks", taskRoutes);
app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
