const User = require('@/models/user');
const Heartbeat = require('@/models/heartbeat');

const handleReceiveHeartbeat = async (request, reply) => {

    const { email, projectName, language, fileName } = request.body;

    if (!email) {
        return reply.code(400).send({ error: 'Email is required' });
    }

    try {
        const user = await User.query().findOne({ email });
        if (!user) {
            return reply.code(404).send({ error: 'User not found' });
        }

        await Heartbeat.query().insert({
            userId: user.id,
            projectName,
            language,
            fileName,
        });

        return reply.send({ success: true });
    } catch (error) {
        request.log.error(error);
        return reply.code(500).send({ error: 'Internal Server Error' });
    }
};

const getActivityStatus = async (request, reply) => {
    const { userUid } = request.params;
    const THRESHOLD_MINUTES = 1;

    try {

        const user = await User.query().findOne({ uid: userUid });
        if (!user) {
            return reply.code(404).send({ error: 'User not found' });
        }

        const lastHeartbeat = await Heartbeat.query()
            .where('userId', user.id)
            .orderBy('createdAt', 'desc')
            .first();

        if (!lastHeartbeat) {
            return reply.send({ isCoding: false });
        }

        const lastActivityTime = new Date(lastHeartbeat.createdAt).getTime();
        const currentTime = new Date().getTime();
        const diffMinutes = (currentTime - lastActivityTime) / (1000 * 60);

        const isCoding = diffMinutes <= THRESHOLD_MINUTES;

        return reply.send({
            isCoding,
            lastActivity: lastHeartbeat
        });
    } catch (error) {
        request.log.error(error);
        return reply.code(500).send({ error: 'Internal Server Error' });
    }
};

const getRecentActivity = async (request, reply) => {
    const { userUid } = request.params;
    const limit = request.query.limit || 10;

    try {
        const user = await User.query().findOne({ uid: userUid });
        if (!user) {
            return reply.code(404).send({ error: 'User not found' });
        }
        const activities = await Heartbeat.query()
            .where('userId', user.id)
            .orderBy('createdAt', 'desc')
            .limit(limit);

        return reply.send({ activities });
    } catch (error) {
        request.log.error(error);
        return reply.code(500).send({ error: 'Internal Server Error' });
    }
};

module.exports = async (fastify) => {
    fastify.post('/heartbeat', handleReceiveHeartbeat);
    fastify.get('/status/:userUid', getActivityStatus);
    fastify.get('/recent/:userUid', getRecentActivity);
}

module.exports.autoPrefix = 'api/activity';
