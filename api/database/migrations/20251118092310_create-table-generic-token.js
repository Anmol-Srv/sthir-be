exports.up = function (knex) {
    return knex.schema.createTable('generic_token', (t) => {
        t.increments('id').unsigned().primary();
        t.boolean('active').defaultTo(true);
        t.integer('user_id')
            .unsigned()
            .index()
            .notNullable()
            .references('id')
            .inTable('user')
            .onDelete('SET NULL');
        t.string('key').notNullable();
        t.string('purpose').notNullable();
        t.string('value').notNullable();
        t.string('status').notNullable().defaultTo('ACTIVE');

        t.index(['key']);
        t.timestamps(false, true);
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('generic_token');
};
