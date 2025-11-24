const { knexSnakeCaseMappers } = require('objection');

const getConnection = () => {
  if (process.env.DATABASE_URL) {
    return process.env.DATABASE_URL;
  }

  return {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5434,
    user: process.env.DB_USER || 'anmol',
    password: process.env.DB_PASSWORD || 'wakeuptoreality',
    database: process.env.DB_NAME || 'sthir',
  };
};

module.exports = {
  development: {
    client: 'pg',
    connection: getConnection(),
    debug: false,
    ...knexSnakeCaseMappers(),
  },
};