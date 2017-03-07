import * as Knex from 'knex';
import * as _ from 'lodash';

import * as TABLE from '../../common/tables';
import { makeBook } from '../factories/book.factory';


exports.seed = async (db: Knex) => {

    // Deletes ALL existing entries
    const authors = await db.select('id').from(TABLE.AUTHOR);
    const authorIds = authors.map(author => author.id);

    let entries = [];
    _.forEach(authorIds, (authorId: number) => {
        entries = _.concat(entries, _.times(10, () => makeBook(authorId).toDatabaseObject()));
    });

    // Inserts seed entries
    return await db(TABLE.BOOK).insert(entries);
};
