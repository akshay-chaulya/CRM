import AppError from "../utils/AppError.js";

const checkRole = (allowedRoles) => {
  return (req, res, next) => {
    if (!allowedRoles.includes(req.user.role)) {
      return next(
        new AppError(
          `Access denied! Your role is "${req.user.role}", but only [${allowedRoles.join(", ")}] are allowed.`,
          403
        )
      );
    }
    next();
  };
};


export default checkRole;
