exports.up = function (knex) {
  return knex.schema.createTable('user', (table) => {
    table.increments('id').unsigned().unique().primary()
    table.string('uid').unique().notNullable()
    table.string('name').notNullable()
    table.string('email').unique().notNullable()
    table.timestamps(false, true)
  })
};

exports.down = function (knex) {
  return knex.schema.dropTable('user')
};
