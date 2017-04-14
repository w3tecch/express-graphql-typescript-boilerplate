import * as Knex from 'knex';

import { models } from 'models';
import { Tables } from '../core/Tables';
import { AbstractRepository } from './AbstractRepository';
import { Utils } from '../core/Utils';


export class AuthorRepository extends AbstractRepository<Knex> {

    public async findAll(options: common.PageinationArguments): Promise<models.author.RawAttributes[]> {
        return this.db
            .select()
            .from(Tables.Authors)
            .limit(options.limit)
            .offset(options.offset);
    }

    public async findById(id: number): Promise<models.author.RawAttributes> {
        const results = await this.db
            .select()
            .from(Tables.Authors)
            .where('id', id);
        return Utils.single(results);
    }

    public async findByIds(ids: number[]): Promise<models.author.RawAttributes[]> {
        return this.db
            .select()
            .from(Tables.Authors)
            .whereIn('id', ids);
    }

    public async search(text: string): Promise<models.author.RawAttributes[]> {
        return this.db
            .select()
            .from(Tables.Authors)
            .where('last_name', 'like', `%${text}%`)
            .orderBy('updated_at', 'DESC');
    }

    public async create(author: models.author.RawAttributes): Promise<number> {
        const ids = await this.db
            .insert(author)
            .into(Tables.Authors);
        return Utils.single<number>(ids);
    }

    public async update(author: models.author.RawAttributes): Promise<void> {
        await this.db
            .update(author)
            .into(Tables.Authors)
            .where('id', author.id);
    }

    public async delete(id: number): Promise<void> {
        await this.db
            .delete()
            .from(Tables.Authors)
            .where('id', id);
    }

}
