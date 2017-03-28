import * as DataLoader from 'dataloader';

import { AuthorRepository } from '../repositories/author.repository';
import { BookRepository } from '../repositories/book.repository';

import { Logger } from '../core/logger';
const log = Logger('app:context:DataLoadersContext');


export class DataLoadersContext {

    private authorDataLaoder: DataLoader<number, any>;
    private bookDataLaoder: DataLoader<number, any>;

    public get AuthorDataLoader(): DataLoader<number, any> {
        return this.authorDataLaoder;
    }

    public get BookDataLoader(): DataLoader<number, any> {
        return this.bookDataLaoder;
    }

    public setAuthorDataLoader(authorRepository: AuthorRepository): DataLoadersContext {
        this.authorDataLaoder = new DataLoader((ids: number[]) => authorRepository.findAuthorsByIds(ids));
        log.debug('setAuthorDataLoader');
        return this;
    }

    public setBookDataLoader(bookRepository: BookRepository): DataLoadersContext {
        this.bookDataLaoder = new DataLoader((ids: number[]) => bookRepository.findBooksByIds(ids));
        log.debug('setBookDataLoader');
        return this;
    }

}
