exports.up = function (knex) {
    return knex.schema.createTable('email_log', (t) => {
        t.increments('id').unsigned().primary();
        t.string('uid', 100).unique().notNullable();
        t.string('to', 80).index();
        t.string('subject').notNullable();
        t.text('body').notNullable();
        t.string('reply_to', 80);
        t.string('status', 20).notNullable();
        t.string('type', 100).index().notNullable();
        t.jsonb('from').notNullable();
        t.timestamps(false, true);
    });
};

exports.down = async function (knex) {
    return knex.schema.dropTable('email_log');
};
