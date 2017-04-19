import * as Knex from 'knex';
import * as _ from 'lodash';

import { Tables } from '../../core/Tables';
import { makeAuthor } from '../factories/AuthorFactory';


exports.seed = (db: Knex) => {

    // generate fake authors
    let entries = _.times(10, () => makeAuthor().toDatabaseObject());

    // Inserts seed entries
    return db(Tables.Authors).insert(entries);

};
