const _ = require('lodash');

const BaseError = require('@/lib/errors/base_error');

class AppError extends BaseError {
  constructor({ message, data, errorCode, debugInfo, statusCode }) {
    if (!message && AppError.errorCodesInfo[errorCode]) {
      // eslint-disable-next-line no-param-reassign
      message = AppError.errorCodesInfo[errorCode].message;
    }
    if (!statusCode && AppError.errorCodesInfo[errorCode]) {
      // eslint-disable-next-line no-param-reassign
      statusCode = AppError.errorCodesInfo[errorCode].statusCode || 422;
    }
    super({ message, data, errorCode, debugInfo, statusCode });
  }
}

AppError.errorCodesInfo = {
  INVALID_PAYLOAD: {
    message: `Invalid payload`,
    statusCode: 422,
  },
  MISSING_REQUIRED_PARAMS: {
    message: `Missing required params.`,
    statusCode: 422,
  },
  MISSING_AUTH_TOKEN: {
    message: `Missing auth token`,
    statusCode: 401,
  },
  INVALID_AUTH_TOKEN: {
    message: `Invalid auth token`,
    statusCode: 403,
  },
  UNAUTHORIZED_ACCESS: {
    message: 'Unauthorized access',
    statusCode: 401,
  },
  SOMETHING_WRONG: {
    message: 'Something went wrong',
    statusCode: 422,
  },
  EMAIL_ALREADY_REGISTERED: {
    message: 'Email is already registered with us. Please login!',
  },
  EMAIL_NOT_FOUND: {
    message: 'Email is not registered with us. Please Signup!',
  },
  INVALID_EMAIL: {
    message: 'Invalid email id',
  },
  OTP_INVALID: {
    message: 'Invalid or expired OTP',
    statusCode: 422,
  },
  ENTITY_NOT_FOUND: {
    message: 'Entity not found',
    statusCode: 422,
  },
  MISSING_PARAMS: {
    message: 'Missing params',
    statusCode: 422,
  },
  INVALID_PERMISSION: {
    message: `Invalid permission`,
    statusCode: 422,
  },
  ENTITY_ALREADY_EXISTS: {
    message: 'Entity already exists',
    statusCode: 422,
  },
};

AppError.errorCodes = _.zipObject(
  Object.keys(AppError.errorCodesInfo),
  Object.keys(AppError.errorCodesInfo)
);

module.exports = AppError;
