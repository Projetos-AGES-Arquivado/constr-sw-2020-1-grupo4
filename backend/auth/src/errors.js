class CodedError extends Error {
  constructor(code, message) {
    super(message);
    this.code = code;
  }

  toJSON() {
    return {
      message: this.message,
      code: this.code,
    };
  }
}

class DetailedCodedError extends CodedError {
  constructor(code, message, details) {
    super(code, message);
    this.details = details;
  }

  toJSON() {
    return {
      ...super.toJSON(),
      details: this.details,
    };
  }
}

class NotFoundError extends CodedError {
  constructor() {
    super('NOT_FOUND', 'Page not found');
  }
}

class ResourceNotFoundError extends CodedError {
  constructor() {
    super('RESOURCE_NOT_FOUND', 'Resource not found');
  }
}

class ValidationError extends DetailedCodedError {
  constructor(details) {
    super('VALIDATION_FAILED', 'Invalid request data', details);
  }
}

class DuplicatedResourceError extends CodedError {
  constructor() {
    super('DUPLICATED_RESOURCE', 'Resource already exists');
  }
}

module.exports = {
  ValidationError,
  DuplicatedResourceError,
  NotFoundError,
  ResourceNotFoundError,
};
