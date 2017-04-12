import { AuthorRepository, BookRepository } from '../repositories';

import { Logger } from '../core/logger';
const log = Logger('app:context:RepositoriesContext');


export class RepositoriesContext {

    private authorRepository: AuthorRepository;
    private bookRepository: BookRepository;

    public get AuthorRepository(): AuthorRepository {
        return this.authorRepository;
    }

    public get BookRepository(): BookRepository {
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
