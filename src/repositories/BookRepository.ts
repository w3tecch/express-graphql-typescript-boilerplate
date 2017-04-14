import * as Knex from 'knex';

import { Tables } from '../core/Tables';
import { BookModel } from '../models/BookModel';
import { AbstractRepository } from './AbstractRepository';
import { Utils } from '../core/Utils';

import { Logger } from '../core/logger';


export class BookRepository extends AbstractRepository<Knex> {

    private log = Logger('app:repo:BookRepository');

    public async findAll(options: common.PageinationArguments): Promise<BookModel[]> {
        this.log.debug('findAll called');
        const results = await this.db
            .select()
            .from(Tables.Books)
            .limit(options.limit)
            .offset(options.offset);
        return results.map((result) => new BookModel(result));
    }

    public async findById(id: number): Promise<BookModel> {
        this.log.debug('findById called with id=', id);
        const results = await this.db.select().from(Tables.Books).where('id', id);
        return (new BookModel(Utils.single(results)));
    }

    public async findByAuthorId(id: number): Promise<BookModel[]> {
        this.log.debug('findByAuthorId called with id=', id);
        const results = await this.db.select().from(Tables.Books).where('author_id', id);
        return results.map((result) => new BookModel(result));
    }

    public async findByIds(ids: number[]): Promise<BookModel[]> {
        this.log.debug('findByIds called with ids=', ids);
        const results = await this.db.select().from(Tables.Books).whereIn('id', ids);
        return results.map((result) => new BookModel(result));
    }

    public async search(text: string): Promise<BookModel[]> {
        const results = await this.db
            .select()
            .from(Tables.Books)
            .where('title', 'like', `%${text}%`)
            .orderBy('updated_at', 'DESC');
        this.log.debug('searchBooks found %s results', results.length);
        return results.map((result) => new BookModel(result));
    }

}
