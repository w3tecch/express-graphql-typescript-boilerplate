import * as Express from 'express';
import * as DataLoader from 'dataloader';

import { models } from 'models';

import { AuthorRepository } from './repositories/author.repository';
import { BookRepository } from './repositories/book.repository';

interface IContextLoaders {
    author: DataLoader<number, models.author.Attributes>;
    book: DataLoader<number, models.book.Attributes>;
}

interface IContextRepos {
    author: AuthorRepository;
    book: BookRepository;
}

export class Context {

    public repos: IContextRepos = <IContextRepos>{};
    public loaders: IContextLoaders = <IContextLoaders>{};

    constructor(
        private request: Express.Request,
        private repsonse: Express.Response
    ) { }

    public get getResponse() {
        return this.repsonse;
    };

    public get getLanguage() {
        return this.request.acceptsLanguages();
    };

    public setAuthorRepository(authorRepository: AuthorRepository): Context {
        this.repos.author = authorRepository;
        this.loaders.author = new DataLoader((ids: number[]) => this.repos.author.findAuthorsByIds(ids));
        return this;
    }

    public setBookRepository(bookRepository: BookRepository): Context {
        this.repos.book = bookRepository;
        this.loaders.book = new DataLoader((ids: number[]) => this.repos.book.findBooksByIds(ids));
        return this;
    }

}
