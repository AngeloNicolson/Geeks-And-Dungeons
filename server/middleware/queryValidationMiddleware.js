const queryValidationMiddleware = (schema) => (request, response, next) => {
  try {
    const { error } = schema.validate(request.body, { abortEarly: false });
    if (error) {
      const errorMessages = error.details.map((detail) => {
        return {
          field: detail.context.label,
          message: detail.message.replace(/['"]/g, ""),
        };
      });
      return response.status(400).json({ errors: errorMessages });
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
};

module.exports = queryValidationMiddleware;
