import * as Knex from 'knex';

import { models } from 'models';
import { AUTHOR } from '../common/tables';
import { BookBuilder } from '../builders/book.builder';
import { AbstractRepository } from './abstract.repository';
import { UserError } from '../core/graphql-error-handling';
import { NotFound } from '../common/exceptions';
import { single, assertResults, mapResults } from '../common/utils';


export class BookRepository extends AbstractRepository<Knex> {

    /**
     *
     *
     * @returns {Promise<models.author.Attributes[]>}
     *
     * @memberOf AuthorRepository
     */
    public async findAllBooks(): Promise<models.author.Attributes[]> {
        const results = await this.db.select().from(AUTHOR);
        return mapResults(results, (result) => (new BookBuilder(result)).build());
    }

    /**
     *
     *
     * @param {number} id
     * @returns {Promise<models.author.Attributes>}
     *
     * @memberOf AuthorRepository
     */
    public async findBookById(id: number): Promise<models.author.Attributes> {
        const results = await this.db.select().from(AUTHOR).where('id', id);
        assertResults(results, id);
        return (new BookBuilder(single(results))).build();
    }

    public findBookByAuthorId(id: number): Promise<models.author.Attributes> {
        const results = await this.db.select().from(AUTHOR).where('author_id', id);
        assertResults(results, id);
        return (new BookBuilder(single(results))).build();
    }

}
