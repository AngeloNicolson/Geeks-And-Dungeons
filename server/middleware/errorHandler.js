const errorHandler = (error, request, response, next) => {
  console.error(error.stack || error.message);
  const statusCode = error.status || 500;
  const errorMessage = error.message || "Internal Server Error";

  return response.status(statusCode).json({
    error: {
      message: errorMessage,
    },
  });
};

module.exports = errorHandler;
