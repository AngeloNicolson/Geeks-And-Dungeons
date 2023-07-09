const errorHandler = (error, request, response, next) => {
  console.error(error.stack || error.message);
  const statusCode = error.status || 500;
  const errorMessage = error.message || "Internal Server Error";

  // Check for Unauthorized error
  if (errorMessage === "Unauthorized") {
    return response.status(401).json({
      error: {
        message: "Unauthorized access",
      },
    });
  }

  return response.status(statusCode).json({
    error: {
      message: errorMessage,
    },
  });
};

module.exports = errorHandler;
