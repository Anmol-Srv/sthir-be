exports.up = function (knex) {
  return knex.schema.createTable('heartbeat', function (table) {
    table.increments('id').primary();
    table.integer('user_id').unsigned().notNullable().references('id').inTable('user').onDelete('SET NULL');
    table.string('project_name');
    table.string('language');
    table.string('file_name');
    table.timestamps(false, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('heartbeat');
};
