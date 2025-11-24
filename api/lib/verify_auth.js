const AuthToken = require('@/models/auth-token');
const User = require('@/models/user');
const AppError = require('@/lib/errors/app_error');
const { convertCookieStringToObject } = require('@/utils/misc');


async function verifyAuthToken(request, authorizationToken) {
  try {
    const authToken = await AuthToken.findByKey(authorizationToken);
    const isValid = await authToken.isValid();
    if (!isValid) {
      throw new AppError({
        errorCode: AppError.errorCodes.INVALID_AUTH_TOKEN,
      });
    }
    const user = await User.query().findById(authToken.userId);
    request.currentUser = user;
    authToken.updateTimeToLive();
  } catch (err) {
    throw new AppError({
      errorCode: AppError.errorCodes.UNAUTHORIZED_ACCESS,
      debugInfo: { err },
    });
  }
}

async function verifyAuth(request, reply) {
  try {
    const { cookie } = request.headers;
    const authorizationToken = convertCookieStringToObject(cookie).auth;
    if (!authorizationToken) {
      throw new AppError({
        errorCode: AppError.errorCodes.MISSING_AUTH_TOKEN,
      });
    }
    try {
      await verifyAuthToken(request, authorizationToken);
    } catch (err) {
      throw new AppError({
        errorCode: AppError.errorCodes.UNAUTHORIZED_ACCESS,
        debugInfo: { err },
      });
    }
  } catch (err) {
    reply.send(err);
  }
}

module.exports = {
  verifyAuth
};
