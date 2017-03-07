import * as Knex from 'knex';

import { models } from 'models';
import { AUTHOR } from '../common/tables';
import { AuthorModel } from '../models/author.model';
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
        return results.map((result) => new AuthorModel(result).toJson());
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
        return (new AuthorModel(Utils.single(results))).toJson();
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
        return results.map((result) => new AuthorModel(result).toJson());
    }

    /**
     *
     *
     * @returns {Promise<models.author.Attributes[]>}
     *
     * @memberOf AuthorRepository
     */
    public async searchAuthors(text: string): Promise<models.author.Attributes[]> {
        const results = await this.db
            .select()
            .from(AUTHOR)
            .where('last_name', 'like', `%${text}%`)
            .orderBy('updated_at', 'DESC');
        log.debug('searchAuthors found %s results', results.length);
        return results.map((result) => new AuthorModel(result).toJson());
    }

}
