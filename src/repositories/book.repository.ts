import * as Knex from 'knex';

import { models } from 'models';
import { BOOK } from '../common/tables';
import { BookModel } from '../models/book.model';
import { AbstractRepository } from './abstract.repository';
import { Utils } from '../common/utils';

import { Logger } from '../core/logger';
const log = Logger('app:repo:BookRepository');


export class BookRepository extends AbstractRepository<Knex> {

    /**
     *
     *
     * @returns {Promise<models.book.Attributes[]>}
     *
     * @memberOf BookRepository
     */
    public async findAllBooks(options: common.PageinationArguments): Promise<models.book.Attributes[]> {
        log.debug('findAllBooks called');
        const results = await this.db
            .select()
            .from(BOOK)
            .limit(options.limit)
            .offset(options.offset);
        return results.map((result) => new BookModel(result).toJson());
    }

    /**
     *
     *
     * @param {number} id
     * @returns {Promise<models.book.Attributes>}
     *
     * @memberOf BookRepository
     */
    public async findBookById(id: number): Promise<models.book.Attributes> {
        log.debug('findBookById called with id=', id);
        const results = await this.db.select().from(BOOK).where('id', id);
        Utils.assertResults(results, id);
        return (new BookModel(Utils.single(results))).toJson();
    }

    /**
     *
     *
     * @param {number} id
     * @returns {Promise<models.book.Attributes>}
     *
     * @memberOf BookRepository
     */
    public async findBookByAuthorId(id: number): Promise<models.book.Attributes> {
        log.debug('findBookByAuthorId called with id=', id);
        const results = await this.db.select().from(BOOK).where('author_id', id);
        return results.map((result) => new BookModel(result).toJson());
    }

    /**
     *
     *
     * @param {number[]} ids
     * @returns {Promise<models.author.Attributes[]>}
     *
     * @memberOf BookRepository
     */
    public async findBooksByIds(ids: number[]): Promise<models.book.Attributes[]> {
        log.debug('findBooksByIds called with ids=', ids);
        const results = await this.db.select().from(BOOK).whereIn('id', ids);
        Utils.assertResults(results, ids);
        return results.map((result) => new BookModel(result).toJson());
    }

    /**
     *
     *
     * @returns {Promise<models.book.Attributes[]>}
     *
     * @memberOf BookRepository
     */
    public async searchBooks(text: string): Promise<models.book.Attributes[]> {
        const results = await this.db
            .select()
            .from(BOOK)
            .where('title', 'like', `%${text}%`)
            .orderBy('updated_at', 'DESC');
        log.debug('searchBooks found %s results', results.length);
        return results.map((result) => new BookModel(result).toJson());
    }

}
