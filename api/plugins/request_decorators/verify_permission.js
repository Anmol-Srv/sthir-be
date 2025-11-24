const fp = require('fastify-plugin');
const { verifyRoutePermissions } = require('@/lib/route_permissions');

module.exports = fp(async (fastify) => {
  fastify.addHook('preHandler', (request, reply, done) => {
    verifyRoutePermissions(request, reply, done);
  });
});
