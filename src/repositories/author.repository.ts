import * as Knex from 'knex';

import { models } from 'models';
import { AUTHOR } from '../common/tables';
import { AuthorBuilder } from '../builders/author.builder';
import { AbstractRepository } from './abstract.repository';
import { Utils } from '../common/utils';

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
    public async findAllAuthors(options: common.PageinationArguments): Promise<models.author.Attributes[]> {
        log.debug('findAllAuthors called');
        const results = await this.db
            .select()
            .from(AUTHOR)
            .limit(options.limit)
            .offset(options.offset);
        return results.map((result) => new AuthorBuilder(result).build());
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
        Utils.assertResults(results, id);
        return (new AuthorBuilder(Utils.single(results))).build();
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
        Utils.assertResults(results, ids);
        return results.map((result) => new AuthorBuilder(result).build());
    }

}
