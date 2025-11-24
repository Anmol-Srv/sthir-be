const decorateCurrentUser = require('@/plugins/request_decorators/current_user');

const getProfile = async (request, reply) => {
    const user = await request.currentUser.$fetchGraph('avatar');

    return {
        success: true,
        user: {
            id: user.id,
            uid: user.uid,
            name: user.name,
            email: user.email,
            createdOn: user.createdAt,
            avatar: user.avatar ? user.avatar[0] : null
        }
    };
}

module.exports = async (fastify) => {
    // Register authentication for all routes in this file
    fastify.register(decorateCurrentUser);

    fastify.get('/profile', getProfile);
}

module.exports.autoPrefix = 'api/user'; 