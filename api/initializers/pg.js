const { types } = require('pg');

module.exports = () => {
  types.setTypeParser(1082, (date) => date);
  types.setTypeParser(20, 'text', parseInt);
};
