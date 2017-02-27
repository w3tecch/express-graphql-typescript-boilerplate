import * as Knex from 'knex';

import { models } from 'models';
import { AUTHOR } from '../common/tables';
import { AuthorBuilder } from '../builders/author.builder';
import { AbstractRepository } from './abstract.repository';
import { single, assertResults, mapResults } from '../common/utils';

import { Logger } from '../core/logger';
const log = Logger('app:repo:AuthorRepository');


export class AuthorRepository extends AbstractRepository<Knex> {

    /**
     *
     *
     * @returns {Promise<models.author.Attributes[]>}
     *
     * @memberOf AuthorRepository
     */
    public async findAllAuthors(): Promise<models.author.Attributes[]> {
        log.debug('findAllAuthors called');
        const results = await this.db.select().from(AUTHOR);
        return mapResults(results, (result) => (new AuthorBuilder(result)).build());
    }

    /**
     *
     *
     * @param {number} id
     * @returns {Promise<models.author.Attributes>}
     *
     * @memberOf AuthorRepository
     */
    public async findAuthorById(id: number): Promise<models.author.Attributes> {
        log.debug('findAuthorById called with id=', id);
        const results = await this.db.select().from(AUTHOR).where('id', id);
        assertResults(results, id);
        return (new AuthorBuilder(single(results))).build();
    }

    /**
     *
     *
     * @param {number[]} ids
     * @returns {Promise<models.author.Attributes[]>}
     *
     * @memberOf AuthorRepository
     */
    public async findAuthorsByIds(ids: number[]): Promise<models.author.Attributes[]> {
        log.debug('findAuthorByIds called with ids=', ids);
        const results = await this.db.select().from(AUTHOR).whereIn('id', ids);
        assertResults(results, ids);
        return mapResults(results, (result) => (new AuthorBuilder(result)).build());
    }

}
