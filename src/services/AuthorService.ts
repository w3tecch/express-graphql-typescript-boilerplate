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
        return this.authorRepository.findAll(options);
    }

    public async findByIds(ids: number[]): Promise<AuthorModel[]> {
        this.log.debug('findByIds called with ids=', ids);
        return this.authorRepository.findByIds(ids);
    }

    public async findById(id: number): Promise<AuthorModel> {
        this.log.debug('findById called with id=', id);
        const author = await this.authorRepository.findById(id);
        if (author === null) {
            throw new NotFoundException(id);
        }
        return author;
    }

    public async search(text: string): Promise<AuthorModel[]> {
        this.log.debug('search called with text=', text);
        return this.authorRepository.search(text);
    }

    public async create(authorModel: AuthorModel): Promise<AuthorModel> {
        this.log.debug('create called with =', authorModel);
        const id = await this.authorRepository.create(authorModel);
        return await this.authorRepository.findById(id);
    }

    public async update(newAuthorModel: AuthorModel): Promise<AuthorModel> {
        this.log.debug('update called with =', newAuthorModel);
        await this.authorRepository.update(newAuthorModel);
        return await this.authorRepository.findById(newAuthorModel.Id);
    }

    public async delete(id: number): Promise<void> {
        this.log.debug('deleteAuthor called with id=', id);
        return this.authorRepository.deleteAuthor(id);
    }

}
