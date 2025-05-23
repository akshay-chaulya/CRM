import AppError from "../utils/AppError.js";

const validate = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.body);
  if (!result.success) {
    const messages = result.error.errors
      .map((e) => {
        const field = e.path && e.path.length > 0 ? e.path.join(".") : "field";
        return `${field}: ${e.message}`;
      })
      .join(", ");
    return next(new AppError(`Validation error: ${messages}`, 400));
  }
  req.body = result.data; // Only the validated and stripped data
  next();
};

export default validate;
