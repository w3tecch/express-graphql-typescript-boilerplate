import { BookRepository } from '../repositories';
import { BookModel } from '../models/BookModel';
import { Logger } from '../core/Logger';
import { NotFoundException } from '../exceptions';


export class BookService {

    private log = Logger('app:service:BookService');

    constructor(private bookRepository: BookRepository) {
    }

    public async findAll(options: common.PageinationArguments): Promise<BookModel[]> {
        this.log.debug('findAll called');
        const results = await this.bookRepository.findAll(options);
        return results.map((result) => new BookModel(result));
    }

    public async findByIds(ids: number[]): Promise<BookModel[]> {
        this.log.debug('findByIds called with ids=', ids);
        const results = await this.bookRepository.findByIds(ids);
        return results.map((result) => new BookModel(result));
    }

    public async findById(id: number): Promise<BookModel> {
        this.log.debug('findById called with id=', id);
        const result = await this.bookRepository.findById(id);
        if (result === null) {
            throw new NotFoundException(id);
        }
        return new BookModel(result);
    }

    public async findByAuthorId(authorId: number): Promise<BookModel[]> {
        this.log.debug('findByAuthorId called with authorId=', authorId);
        const results = await this.bookRepository.findByAuthorId(authorId);
        return results.map((result) => new BookModel(result));
    }

    public async search(text: string): Promise<BookModel[]> {
        this.log.debug('search called with text=', text);
        const results = await this.bookRepository.search(text);
        return results.map((result) => new BookModel(result));
    }

}
