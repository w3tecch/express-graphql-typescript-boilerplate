import { BookRepository } from '../repositories';
import { BookModel } from '../models/BookModel';
import { Logger } from '../core/logger';
import { NotFoundException } from '../exceptions';


export class BookService {

    private log = Logger('app:service:BookService');

    constructor(private bookRepository: BookRepository) {
    }

    public async findAll(options: common.PageinationArguments): Promise<BookModel[]> {
        this.log.debug('findAll called');
        return this.bookRepository.findAll(options);
    }

    public async findByIds(ids: number[]): Promise<BookModel[]> {
        this.log.debug('findByIds called with ids=', ids);
        return this.bookRepository.findByIds(ids);
    }

    public async findById(id: number): Promise<BookModel> {
        this.log.debug('findById called with id=', id);
        const author = await this.bookRepository.findById(id);
        if (author === null) {
            throw new NotFoundException(id);
        }
        return author;
    }

    public async findByAuthorId(id: number): Promise<BookModel[]> {
        this.log.debug('findByAuthorId called with id=', id);
        return this.bookRepository.findByAuthorId(id);
    }

    public async search(text: string): Promise<BookModel[]> {
        this.log.debug('search called with text=', text);
        return this.bookRepository.search(text);
    }

}
