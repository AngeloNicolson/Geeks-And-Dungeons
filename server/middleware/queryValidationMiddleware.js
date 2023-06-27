const queryValidationMiddleware = (schema) => (request, response, next) => {
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
};

module.exports = queryValidationMiddleware;
