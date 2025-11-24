const decorateCurrentUser = require('@/plugins/request_decorators/current_user');
const Avatar = require('@/models/avatar');
const UserAvatarMap = require('@/models/user-avatar-map');

const getAvatars = async (request, reply) => {
    const avatars = await Avatar.query();
    return {
        success: true,
        avatars
    };
};

const selectAvatar = async (request, reply) => {
    const user = request.currentUser;
    const { avatarId } = request.body;

    // Deactivate current avatar
    await UserAvatarMap.query()
        .where({ userId: user.id })
        .patch({ isActive: false });

    // Activate new avatar
    await UserAvatarMap.query().insert({
        userId: user.id,
        avatarId,
        isActive: true
    });

    return {
        success: true
    };
};

module.exports = async (fastify) => {
    fastify.register(decorateCurrentUser);
    fastify.get('/', getAvatars);
    fastify.post('/select', selectAvatar);
};

module.exports.autoPrefix = 'api/avatar';
