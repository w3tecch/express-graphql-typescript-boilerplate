import * as Knex from 'knex';
import * as _ from 'lodash';

import { Tables } from '../../core/Tables';
import { makeBook } from '../factories/BookFactory';


exports.seed = async (db: Knex) => {

    // Deletes ALL existing entries
    const authors = await db.select('id').from(Tables.Authors);
    const authorIds = authors.map(author => author.id);

    let entries = [];
    _.forEach(authorIds, (authorId: number) => {
        entries = _.concat(entries, _.times(10, () => makeBook(authorId).toDatabaseObject()));
    });

    // Inserts seed entries
    return await db(Tables.Books).insert(entries);
};
