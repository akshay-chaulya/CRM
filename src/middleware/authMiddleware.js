import AppError from "../utils/AppError.js";
import catchAsync from "../utils/catchAsync.js";
import { verifyToken } from "../utils/jwt.js";
import * as authRepository from "../repositories/auth.repository.js";

const authMiddleware = catchAsync(async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return next(
      new AppError(
        "Access denied: Missing Authorization header. Please log in.",
        401
      )
    );
  }

  const [scheme, token] = authHeader.split(" ");
  if (scheme !== "Bearer" || !token) {
    return next(
      new AppError(
        "Invalid authorization format. Use 'Authorization: Bearer <token>'.",
        400
      )
    );
  }

  const payload = verifyToken(token);
  if (!payload) {
    return next(
      new AppError(
        "Authentication failed: Token invalid or expired. Please log in again.",
        401
      )
    );
  }

  const user = await authRepository.findUserById(payload.id);
  if (!user) {
    return next(
      new AppError(
        `User does not exist (ID: ${payload.id}). Please register or contact support.`,
        404
      )
    );
  }
  req.user = user;
  next();
});

export default authMiddleware;
