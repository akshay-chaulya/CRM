import cors from "cors";
import express from "express";
import rateLimit from "express-rate-limit";
import morgan from "morgan";
import { nodeEnv, port } from "./config/index.js";
import globalErrorHandler from "./middleware/errorHandler.js";
import mainRouter from "./routes/index.js";
import appError from "./utils/AppError.js";
import connectDB from "./config/db.js";

export const app = express();

// Conditional logging in development
if (nodeEnv === "development") app.use(morgan("dev"));

// Parse JSON bodies (limit size to prevent DOS via large payloads)
app.use(express.json({ limit: "10kb" }));
app.use(cors());

app.use(
  "/api",
  rateLimit({
    max: 100,
    windowMs: 60 * 60 * 1000,
    message: "Too many requests from this IP, please try again in an hour!",
  })
);

// Routes
app.get("/", (req, res) => {
  res.send("Hello from backend!");
});

app.use("/api/v1", mainRouter);

// Catch-all for unhandled routes
app.use((req, res, next) => {
  return next(new appError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
    process.exit(1);
  });
