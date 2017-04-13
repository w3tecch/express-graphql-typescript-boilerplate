import * as Knex from 'knex';

import { models } from 'models';
import { Tables } from '../core/Tables';
import { BookModel } from '../models/BookModel';
import { AbstractRepository } from './AbstractRepository';
import { Utils } from '../core/Utils';

import { Logger } from '../core/logger';
const log = Logger('app:repo:BookRepository');


export class BookRepository extends AbstractRepository<Knex> {

    public async findAllBooks(options: common.PageinationArguments): Promise<models.book.Attributes[]> {
        log.debug('findAllBooks called');
        const results = await this.db
            .select()
            .from(Tables.Books)
            .limit(options.limit)
            .offset(options.offset);
        return results.map((result) => new BookModel(result).toJson());
    }

    public async findBookById(id: number): Promise<models.book.Attributes> {
        log.debug('findBookById called with id=', id);
        const results = await this.db.select().from(Tables.Books).where('id', id);
        Utils.assertResults(results, id);
        return (new BookModel(Utils.single(results))).toJson();
    }

    public async findBookByAuthorId(id: number): Promise<models.book.Attributes> {
        log.debug('findBookByAuthorId called with id=', id);
        const results = await this.db.select().from(Tables.Books).where('author_id', id);
        return results.map((result) => new BookModel(result).toJson());
    }

    public async findBooksByIds(ids: number[]): Promise<models.book.Attributes[]> {
        log.debug('findBooksByIds called with ids=', ids);
        const results = await this.db.select().from(Tables.Books).whereIn('id', ids);
        Utils.assertResults(results, ids);
        return results.map((result) => new BookModel(result).toJson());
    }

    public async searchBooks(text: string): Promise<models.book.Attributes[]> {
        const results = await this.db
            .select()
            .from(Tables.Books)
            .where('title', 'like', `%${text}%`)
            .orderBy('updated_at', 'DESC');
        log.debug('searchBooks found %s results', results.length);
        return results.map((result) => new BookModel(result).toJson());
    }

}
