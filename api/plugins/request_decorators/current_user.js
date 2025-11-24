const fp = require('fastify-plugin');
const {verifyAuth} = require('@/lib/verify_auth');

module.exports = fp(async (fastify) => {
  fastify.decorateRequest('currentUser');
  fastify.addHook('onRequest', verifyAuth);
});
