import * as Knex from 'knex';

import { models } from 'models';
import { Tables } from '../core/Tables';
import { AbstractRepository } from './AbstractRepository';


export class BookRepository extends AbstractRepository<Knex> {

    public async findAll(options: common.PageinationArguments): Promise<models.book.RawAttributes[]> {
        return await this.db
            .select()
            .from(Tables.Books)
            .limit(options.limit)
            .offset(options.offset);
    }

    public async findById(id: number): Promise<models.book.RawAttributes> {
        return this.db
            .select()
            .from(Tables.Books)
            .where('id', id);
    }

    public async findByAuthorId(id: number): Promise<models.book.RawAttributes[]> {
        return this.db
            .select()
            .from(Tables.Books)
            .where('author_id', id);
    }

    public async findByIds(ids: number[]): Promise<models.book.RawAttributes[]> {
        return this.db
            .select()
            .from(Tables.Books)
            .whereIn('id', ids);
    }

    public async search(text: string): Promise<models.book.RawAttributes[]> {
        return this.db
            .select()
            .from(Tables.Books)
            .where('title', 'like', `%${text}%`)
            .orderBy('updated_at', 'DESC');
    }

}
