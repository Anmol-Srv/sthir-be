const User = require('@/models/user');
const AppError = require('@/lib/errors/app_error');

const handleSignUp = async (request, reply) => {
    let { name, email } = request.body;

    email = email.toLowerCase();

    const isEmailRegistered = await User.isEmailRegistered(email);

    if (isEmailRegistered) {
        return {
            success: false,
            isEmailRegistered,
            message: 'Email already registered. Please log in instead.'
        }
    }

    const user = await User.query().insert({
        name,
        email,
    });

    return reply.login({ user, payload: { user: { id: user.id, name: user.name, email: user.email }, success: true, message: 'Account created successfully' } });
}

const sendOTP = async (request) => {
    let { email } = request.body;
    email = email.toLowerCase();
    const user = await User.query().findOne({ email });
    if (!user) {
        throw new AppError({
            errorCode: AppError.errorCodes.EMAIL_NOT_FOUND,
            debugInfo: { email },
        });
    }
    try {
        await user.sendOTPEmail();
    } catch (err) {
        throw new AppError({
            errorCode: AppError.errorCodes.SOMETHING_WRONG,
            debugInfo: { email },
        });
    }
    return { success: true };
};

const verifyOTP = async (request, reply) => {
    const { otp } = request.body;
    let { email } = request.body;
    email = email.toLowerCase();

    const user = await User.query().findOne({ email });
    if (!user) {
        throw new AppError({
            errorCode: AppError.errorCodes.EMAIL_NOT_FOUND,
            debugInfo: { email },
        });
    }
    try {
        await user.verifyOTP({ otp });
    } catch (err) {
        throw new AppError({
            errorCode: AppError.errorCodes.OTP_INVALID,
        });
    }
    return reply.userLogin({ user, payload: { success: true } });
};

const logout = async (request, reply) => {
    const { Auth } = request.headers;
    const authorizationToken = Auth;
    if (authorizationToken) {
        await AuthToken.query()
            .patch({ active: false })
            .where({ key: authorizationToken });
    }

    return reply.userLogout({
        payload: { success: true },
    });
};

module.exports = async (fastify) => {
    fastify.post('/signup', handleSignUp);
    fastify.post('/send-otp', sendOTP);
    fastify.post('/verify-otp', verifyOTP);
    fastify.post('/logout', logout);
}

module.exports.autoPrefix = 'api/auth';