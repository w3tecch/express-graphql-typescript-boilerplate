import * as Knex from 'knex';

import { Tables } from '../core/Tables';
import { AuthorModel } from '../models/AuthorModel';
import { AbstractRepository } from './AbstractRepository';
import { Utils } from '../core/Utils';
import { Logger } from '../core/logger';


export class AuthorRepository extends AbstractRepository<Knex> {

    private log = Logger('app:repo:AuthorRepository');

    public async findAll(options: common.PageinationArguments): Promise<AuthorModel[]> {
        this.log.debug('findAll called');
        const results = await this.db
            .select()
            .from(Tables.Authors)
            .limit(options.limit)
            .offset(options.offset);
        return results.map((result) => new AuthorModel(result));
    }

    public async findById(id: number): Promise<AuthorModel> {
        this.log.debug('findById called with id=', id);
        const results = await this.db.select().from(Tables.Authors).where('id', id);
        return (new AuthorModel(Utils.single(results)));
    }

    public async findByIds(ids: number[]): Promise<AuthorModel[]> {
        this.log.debug('findrByIds called with ids=', ids);
        const results = await this.db.select().from(Tables.Authors).whereIn('id', ids);
        return results.map((result) => new AuthorModel(result));
    }

    public async search(text: string): Promise<AuthorModel[]> {
        const results = await this.db
            .select()
            .from(Tables.Authors)
            .where('last_name', 'like', `%${text}%`)
            .orderBy('updated_at', 'DESC');
        this.log.debug('searchAuthors found %s results', results.length);
        return results.map((result) => new AuthorModel(result));
    }

    public async create(authorModel: AuthorModel): Promise<number> {
        const ids = await this.db
            .insert(authorModel.toDatabaseObject())
            .into(Tables.Authors);
        return Utils.single<number>(ids);
    }

    public async update(newAuthorModel: AuthorModel): Promise<void> {
        const author = await this.findById(newAuthorModel.Id);
        author.merge(newAuthorModel);
        await this.db
            .update(author.toDatabaseObject())
            .into(Tables.Authors)
            .where('id', author.Id);
    }

    public async deleteAuthor(id: number): Promise<void> {
        await this.db.delete().from(Tables.Authors).where('id', id);
    }

}
