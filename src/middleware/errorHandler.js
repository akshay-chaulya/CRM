import { nodeEnv } from "../config/index.js";

const globalErrorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (nodeEnv === "production") {
    if (err.isOperational) {
      res
        .status(err.statusCode)
        .json({ status: err.status, message: err.message });
    } else {
      console.log("UNEXPECTED ERROR: ", err);
      res
        .status(500)
        .json({ status: "error", message: "Something went very wrong!" });
    }
  } else {
    console.error("ERROR: ", err);
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
      // stack: err.stack,
      error: err,
    });
  }
};

export default globalErrorHandler;
