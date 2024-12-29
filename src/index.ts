import express, { Express } from "express";
import dotenv from "dotenv";
import { connectDB } from "./db/db";
import { logger } from "./utils/logger";

// Routes
import authRoutes from "./routes/auth";
import adminAuthRoutes from "./routes/admin/auth";

dotenv.config(); // Load environment variables from .env file

const app: Express = express();
const port = process.env.PORT || 3000;

// Connect to DataBase
connectDB();

// Third-party middleware
app.use(express.json());

// custom middlewares
app.use("/api", authRoutes);
app.use("/api", adminAuthRoutes);

app.listen(port, () => {
  logger.success(`[server]: Server is running at http://localhost:${port}`);
});
