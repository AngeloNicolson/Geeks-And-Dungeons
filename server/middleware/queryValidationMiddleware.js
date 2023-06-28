const queryValidationMiddleware = (schema) => (request, response, next) => {
  try {
    const { error } = schema.validate(request.body, { abortEarly: false });
    if (error) {
      const { details } = error;
      const message = details.map((detail) => detail.message).join(",");
      const validationError = new Error(message);
      validationError.status = 400;
      throw validationError;
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
};

module.exports = queryValidationMiddleware;
