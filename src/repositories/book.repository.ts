import * as Knex from 'knex';

import { models } from 'models';
import { BOOK } from '../common/tables';
import { BookBuilder } from '../builders/book.builder';
import { AbstractRepository } from './abstract.repository';
import { single, assertResults, mapResults } from '../common/utils';

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
    public async findAllBooks(): Promise<models.author.Attributes[]> {
        log.debug('findAllBooks called');
        const results = await this.db.select().from(BOOK);
        return mapResults(results, (result) => (new BookBuilder(result)).build());
    }

    /**
     *
     *
     * @param {number} id
     * @returns {Promise<models.book.Attributes>}
     *
     * @memberOf BookRepository
     */
    public async findBookById(id: number): Promise<models.author.Attributes> {
        log.debug('findBookById called with id=', id);
        const results = await this.db.select().from(BOOK).where('id', id);
        assertResults(results, id);
        return (new BookBuilder(single(results))).build();
    }

    /**
     *
     *
     * @param {number} id
     * @returns {Promise<models.book.Attributes>}
     *
     * @memberOf BookRepository
     */
    public async findBookByAuthorId(id: number): Promise<models.author.Attributes> {
        log.debug('findBookByAuthorId called with id=', id);
        const results = await this.db.select().from(BOOK).where('author_id', id);
        assertResults(results, id);
        return (new BookBuilder(single(results))).build();
    }

    /**
     *
     *
     * @param {number[]} ids
     * @returns {Promise<models.author.Attributes[]>}
     *
     * @memberOf BookRepository
     */
    public async findBooksByIds(ids: number[]): Promise<models.author.Attributes[]> {
        log.debug('findBooksByIds called with ids=', ids);
        const results = await this.db.select().from(BOOK).whereIn('id', ids);
        assertResults(results, ids);
        return mapResults(results, (result) => (new BookBuilder(result)).build());
    }

}
