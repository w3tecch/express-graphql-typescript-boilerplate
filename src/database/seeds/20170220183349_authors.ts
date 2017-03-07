import * as Knex from 'knex';
import * as _ from 'lodash';

import * as TABLE from '../../common/tables';
import { makeAuthor } from '../factories/author.factory';


exports.seed = (db: Knex) => {

    // generate fake authors
    let entries = _.times(10, () => makeAuthor().toDatabaseObject());

    // Inserts seed entries
    return db(TABLE.AUTHOR).insert(entries);

};
