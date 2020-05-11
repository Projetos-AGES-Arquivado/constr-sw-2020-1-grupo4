const {
  NotFoundError,
  ResourceNotFoundError,
  DuplicatedResourceError,
  ValidationError,
} = require('../errors');

const errHandlerMiddleware = (err, req, res, next) => {
  console.warn(err);

  if (err instanceof NotFoundError || err instanceof ResourceNotFoundError) {
    res.status(404).send(err);
    return next();
  }

  if (err instanceof DuplicatedResourceError) {
    res.status(409).send(err);
    return next();
  }

  if (err instanceof ValidationError) {
    res.status(400).send(err);
    return next();
  }

  res.status(500).send({
    code: 'UNEXPECTED_ERROR',
    message: 'Internal server failure',
  });

  return next();
};

module.exports = errHandlerMiddleware;
