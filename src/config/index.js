import "dotenv/config";

export const nodeEnv = process.env.NODE_ENV;
export const allowedOrigins =
  process.env.CORS_ORIGINS?.split(",").map((origin) => origin.trim()) || [];

export const port = process.env.PORT || 5000;

export const dbUrl = process.env.DB_URL || "mongodb://localhost:27017/myapp";
export const jwtSecret = process.env.JWT_SECRET || "defaultSecret";

export const passKey = process.env.PASS_KEY || "defaultPassKey";
