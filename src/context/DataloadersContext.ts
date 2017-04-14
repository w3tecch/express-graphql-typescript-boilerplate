import * as DataLoader from 'dataloader';

import { AuthorRepository, BookRepository } from '../repositories';

import { Logger } from '../core/logger';
const log = Logger('app:context:DataLoadersContext');


export class DataLoadersContext {

    static instance: DataLoadersContext;

    private authorDataLaoder: DataLoader<number, any>;
    private bookDataLaoder: DataLoader<number, any>;

    static getInstance(): DataLoadersContext {
        if (!DataLoadersContext.instance) {
            DataLoadersContext.instance = new DataLoadersContext();
        }
        return DataLoadersContext.instance;
    }

    public get AuthorDataLoader(): DataLoader<number, any> {
        return this.authorDataLaoder;
    }

    public get BookDataLoader(): DataLoader<number, any> {
        return this.bookDataLaoder;
    }

    public setAuthorDataLoader(authorRepository: AuthorRepository): DataLoadersContext {
        this.authorDataLaoder = new DataLoader((ids: number[]) => authorRepository.findByIds(ids));
        log.debug('setAuthorDataLoader');
        return this;
    }

    public setBookDataLoader(bookRepository: BookRepository): DataLoadersContext {
        this.bookDataLaoder = new DataLoader((ids: number[]) => bookRepository.findByIds(ids));
        log.debug('setBookDataLoader');
        return this;
    }

}
