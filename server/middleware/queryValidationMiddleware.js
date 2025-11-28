const validateSchema = (schema, data) => {
  if (!schema) return null;

  const { error } = schema.validate(data);
  if (error) {
    const errorMessages = error.details.map((detail) => ({
      field: detail.context.key,
      message: detail.message.replace(/['"]/g, ""),
    }));
    return errorMessages;
  }

  return null;
};

const queryValidationMiddleware =
  (paramSchema, bodySchema) => (request, response, next) => {
    try {
      const paramErrors = validateSchema(paramSchema, request.params);
      const bodyErrors = validateSchema(bodySchema, request.body);

      const errors = [];
      if (paramErrors) {
        errors.push(...paramErrors);
      }
      if (bodyErrors) {
        errors.push(...bodyErrors);
      }

      if (errors.length > 0) {
        return response.status(400).json({ errors });
      } else {
        next();
      }
    } catch (error) {
      next(error);
    }
  };

module.exports = queryValidationMiddleware;
