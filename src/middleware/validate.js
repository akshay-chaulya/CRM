const validate = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.body);

  if (!result.success) {
    const errors = result.error.errors.map((e) => {
      const field = e.path?.[0] || "unknown";
      return {
        field,
        message: e.message,
      };
    });

    return res.status(400).json({
      status: "fail",
      message: "Invalid Credentials",
      errors,
    });
  }

  req.body = result.data;
  next();
};

export default validate;
