const { Model } = require('objection');

const database = require('@/database');

module.exports = () => {
  Model.knex(database);
};