import { AuthorRepository } from '../repositories/author.repository';
import { BookRepository } from '../repositories/book.repository';

import { Logger } from '../core/logger';
const log = Logger('app:context:RepositoriesContext');


export class RepositoriesContext {

    private authorRepository: AuthorRepository;
    private bookRepository: BookRepository;

    public get AuthorRepository() {
        return this.authorRepository;
    }

    public get BookRepository() {
        return this.bookRepository;
    }

    public setAuthorRepository(authorRepository: AuthorRepository): RepositoriesContext {
        this.authorRepository = authorRepository;
        log.debug('setAuthorRepository');
        return this;
    }

    public setBookRepository(bookRepository: BookRepository): RepositoriesContext {
        this.bookRepository = bookRepository;
        log.debug('setBookRepository');
        return this;
    }

}
