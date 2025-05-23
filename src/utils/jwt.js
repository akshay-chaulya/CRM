import jwt from "jsonwebtoken";
import { jwtSecret } from "../config/index.js";

export const createToken = (user) => {
  const payload = {
    id: user._id,
    email: user.email,
    role: user.role,
    added_by: user.added_by,
  };
  const token = jwt.sign(payload, jwtSecret, {
    expiresIn: "7d",
  });
  return token;
};

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, jwtSecret);
  } catch (error) {
    return null;
  }
};
