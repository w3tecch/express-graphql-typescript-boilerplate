import { AuthorRepository } from '../repositories';
import { AuthorModel } from '../models/AuthorModel';
import { Logger } from '../core/logger';
import { NotFoundException } from '../exceptions';

export class AuthorService {

    private log = Logger('app:service:AuthorService');

    constructor(private authorRepository: AuthorRepository) {
    }

    public async findAll(options: common.PageinationArguments): Promise<AuthorModel[]> {
        this.log.debug('findAll called');
        const results = await this.authorRepository.findAll(options);
        return results.map((result) => new AuthorModel(result));
    }

    public async findByIds(ids: number[]): Promise<AuthorModel[]> {
        this.log.debug('findByIds called with ids=', ids);
        const results = await this.authorRepository.findByIds(ids);
        return results.map((result) => new AuthorModel(result));
    }

    public async findById(id: number): Promise<AuthorModel> {
        this.log.debug('findById called with id=', id);
        const result = await this.authorRepository.findById(id);
        if (result === null) {
            throw new NotFoundException(id);
        }
        return new AuthorModel(result);
    }

    public async search(text: string): Promise<AuthorModel[]> {
        this.log.debug('search called with text=', text);
        const results = await this.authorRepository.search(text);
        return results.map((result) => new AuthorModel(result));
    }

    public async create(authorModel: AuthorModel): Promise<AuthorModel> {
        this.log.debug('create called with =', authorModel);
        const id = await this.authorRepository.create(authorModel.toDatabaseObject());
        return this.findById(id);
    }

    public async update(newAuthorModel: AuthorModel): Promise<AuthorModel> {
        const authorModel = await this.findById(newAuthorModel.Id);
        authorModel.merge(newAuthorModel);
        await this.authorRepository.update(authorModel.toDatabaseObject());
        return this.findById(newAuthorModel.Id);
    }

    public async delete(id: number): Promise<void> {
        this.log.debug('delete called with id=', id);
        return this.authorRepository.delete(id);
    }

}
