export * from './Context';
export * from './DataloadersContext';
export * from './ServicesContext';

import { DB } from '../core/Database';
import {
    AuthorRepository,
    BookRepository
} from '../repositories';


/**
 * Services
 */
import { ServicesContext } from './ServicesContext';

import {
    BookService,
    AuthorService
} from '../services';

ServicesContext.getInstance()
    .setBookService(new BookService(new BookRepository(DB)))
    .setAuthorService(new AuthorService(new AuthorRepository(DB)));


/**
 * Dataloaders
 */
import { DataLoadersContext } from './DataloadersContext';
DataLoadersContext.getInstance()
    .setAuthorDataLoader(ServicesContext.getInstance().AuthorService)
    .setBookDataLoader(ServicesContext.getInstance().BookService);
