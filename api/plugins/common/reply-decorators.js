/* eslint-disable global-require */

const fp = require('fastify-plugin');

const isProduction = process.env.NODE_ENV === 'production';
const dayjs = require('dayjs');

const cookieOptions = {
  path: '/',
  secure: isProduction, // send cookie over HTTPS only
  httpOnly: true,
  domain: process.env.DOMAIN_NAME || 'localhost',
  expires: dayjs().add('60', 'days').toDate(),
};

module.exports = fp(async (fastify) => {
  fastify.decorateReply('userLogin', async function ({ user, payload }) {
    const { key } = await user.generateAuthToken();
    this.setCookie('auth', key, cookieOptions).code(200).send(payload);
  });

  fastify.decorateReply('userLogout', function ({ payload }) {
    this.clearCookie('auth', cookieOptions).code(200).send(payload);
  });
});
