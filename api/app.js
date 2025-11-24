/* eslint-disable global-require */
const path = require('path');
const Fastify = require('fastify');
const AutoLoad = require('@fastify/autoload');
const FastifyCors = require('@fastify/cors');
const fastifyFormbody = require('@fastify/formbody');
const fastifyCookie = require('@fastify/cookie');

const initializers = require('./initializers');


const buildFastify = async (fastify, opts) => {
  await initializers();

  if (!fastify) {
    fastify = Fastify(opts);
  }

  const now = () => Date.now();
  if (opts.disableRequestLogging) {
    fastify.addHook('onRequest', (req, reply, done) => {
      reply.startTime = now();
      req.log.info({ url: req.raw.url }, 'request received');
      done();
    });

    fastify.addHook('onResponse', (req, reply, done) => {
      req.log.info(
        {
          url: req.raw.url, // add url to response as well for simple correlating
          statusCode: reply.raw.statusCode,
          durationMs: now() - reply.startTime, // recreate duration in ms - use process.hrtime() - https://nodejs.org/api/process.html#process_process_hrtime_bigint for most accuracy
          method: req.method,
          hostname: req.hostname,
          remoteAddress: req.ip,
          headers: req.headers,
        },
        'request completed'
      );
      done();
    });
  }

  // for parsing media type: application/x-www-form-urlencoded
  fastify.register(fastifyFormbody);

  fastify.register(fastifyCookie);

  fastify.register(FastifyCors, {
    credentials: true,
    origin: [
      /http:\/\/localhost*/
    ],
    methods: ['OPTIONS', 'POST', 'GET', 'PUT', 'DELETE'],
  });

  // health-check
  fastify.get('/ping', { logLevel: 'silent' }, () => 'pong');

  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'plugins', 'common'),
    options: { ...opts },
  });

  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'routes'),
    options: { ...opts },
  });

  return fastify;
};

module.exports = buildFastify;
