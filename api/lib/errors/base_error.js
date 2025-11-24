class BaseError extends Error {
    constructor({ message, data, errorCode, debugInfo, statusCode }) {
      super(message);
      this.data = data; // shared with client
      this.errorCode = errorCode; // internal error code - string
      this.debugInfo = debugInfo; // sent to sentry
      this.statusCode = statusCode; // http error code - should be >= 400, else fastify will convert it to 500
    }
  }
  
  module.exports = BaseError;
  