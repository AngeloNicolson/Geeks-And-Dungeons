const joiErrorHandler = (error, request, response, next) => {
  if (error.name === "ValidationError") {
    const errorMessages = error.details.map((detail) => detail.message);
    const errorMessage = errorMessages.join(", ");
    response.status(400).json({ error: errorMessage });
  } else {
    next(error);
  }
};

module.exports = joiErrorHandler;
