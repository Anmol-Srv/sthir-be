exports.up = function (knex) {
  return knex.schema.createTable('auth_token', (t) => {
    t.increments('id').unsigned().primary();
    t.boolean('active').defaultTo(true);
    t.integer('user_id')
      .unsigned()
      .index()
      .notNullable()
      .references('id')
      .inTable('user')
      .onDelete('SET NULL');
    t.dateTime('time_to_live');
    t.string('key').notNullable().unique();
    t.timestamps(false, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('auth_token');
};
