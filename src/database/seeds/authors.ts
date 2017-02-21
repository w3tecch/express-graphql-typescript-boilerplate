import * as Knex from 'knex';
import * as _ from 'lodash';

import { makeAuthor } from '../factories/author.factory';


exports.seed = (knex: Knex) => {

    // Deletes ALL existing entries
    return knex('author').truncate()
        .then(function () {

            // generate fake authors
            let entries = _.times(10, makeAuthor);

            // Inserts seed entries
            return knex('author').insert(entries);
        });
};
