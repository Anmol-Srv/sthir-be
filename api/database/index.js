const Knex = require('knex');

const env = process.env.NODE_ENV || 'development';

const config = require('@/database/config');

module.exports = Knex(config[env]);
