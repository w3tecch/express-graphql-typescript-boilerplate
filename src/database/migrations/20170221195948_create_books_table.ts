import * as Knex from 'knex';


exports.up = (db: Knex): Promise<any> => {
    return Promise.all([
        db.schema.createTable('books', (table: Knex.CreateTableBuilder) => {
            table.increments('id').primary();
            table.string('title').notNullable();
            table.string('description');
            table.decimal('price', 6, 2).notNullable();
            table.dateTime('published_at').notNullable();
            table.integer('author_id')
                .unsigned()
                .references('id')
                .inTable('authors')
                .onDelete('CASCADE')
                .onUpdate('CASCADE');
            table.timestamp('updated_at').defaultTo(db.fn.now());
            table.timestamp('created_at').defaultTo(db.fn.now());
        })
    ]);
};

exports.down = (db: Knex): Promise<any> => {
    return Promise.all([
        db.schema.dropTable('books')
    ]);
};
