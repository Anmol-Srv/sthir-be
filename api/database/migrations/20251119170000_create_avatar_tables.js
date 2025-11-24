exports.up = function (knex) {
    return knex.schema
        .createTable('avatar', (table) => {
            table.increments('id').unsigned().unique().primary();
            table.string('uid').unique().notNullable();
            table.string('name').notNullable();
            table.string('image_url').notNullable();
            table.string('gender').notNullable(); // 'MALE', 'FEMALE'
            table.timestamps(false, true);
        })
        .createTable('user_avatar_map', (table) => {
            table.increments('id').unsigned().unique().primary();
            table.integer('user_id').unsigned().notNullable().references('id').inTable('user').onDelete('CASCADE');
            table.integer('avatar_id').unsigned().notNullable().references('id').inTable('avatar').onDelete('CASCADE');
            table.boolean('is_active').defaultTo(true);
            table.timestamps(false, true);
        })
        .then(() => {
            // Seed initial avatars
            const { nanoid } = require('nanoid');
            return knex('avatar').insert([
                {
                    uid: nanoid(12),
                    name: 'Male Avatar',
                    image_url: '/avatars/male.png',
                    gender: 'MALE'
                },
                {
                    uid: nanoid(12),
                    name: 'Female Avatar',
                    image_url: '/avatars/female.png',
                    gender: 'FEMALE'
                }
            ]);
        });
};

exports.down = function (knex) {
    return knex.schema
        .dropTable('user_avatar_map')
        .dropTable('avatar');
};
