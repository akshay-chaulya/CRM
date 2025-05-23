import AppError from "../utils/AppError.js";

const checkRole = (role) => {
  return (req, res, next) => {
    if (req.user.role !== role) {
      return next(
        new AppError(
          `Access denied! You do not have permission to perform this action. Because your role is ${req.user.role} but only ${role} is allowed`,
          403
        )
      );
    }
    next();
  };
};

export default checkRole;
