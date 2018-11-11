import * as DataLoader from 'dataloader';

import { AuthorService, BookService } from '../services';

import { Logger } from '../core/Logger';
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

    public setAuthorDataLoader(authorService: AuthorService): DataLoadersContext {
        this.authorDataLaoder = new DataLoader(async (ids: number[]) => {
            const authors = await authorService.findByIds(ids);
            return authors.map(a => a.toJson());
        });
        log.debug('setAuthorDataLoader');
        return this;
    }

    public setBookDataLoader(bookService: BookService): DataLoadersContext {
        this.bookDataLaoder = new DataLoader(async (ids: number[]) => {
            const books = await bookService.findByIds(ids);
            return books.map(b => b.toJson());
        });
        log.debug('setBookDataLoader');
        return this;
    }

}
