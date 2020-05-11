const { ValidationError } = require('../errors');

const validatorMiddleware = (schema) => (
  req,
  res,
  next
) => {
  const validation = schema.validate(req, {
    abortEarly: false,
    stripUnknown: true,
    allowUnknown: true,
  });

  if (validation.error) {
    return next(new ValidationError(validation.error.details));
  }

  Object.assign(req, validation.value);

  return next();
};

module.exports = validatorMiddleware;
