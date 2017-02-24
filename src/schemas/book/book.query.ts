import {
    GraphQLID,
    GraphQLList,
    GraphQLFieldConfig,
    GraphQLNonNull
} from 'graphql';

import { Logger } from '../../core/logger';
const log = Logger('app:schemas:author:query');

import { BookType } from './book.type';
import { BookRepository } from '../../repositories/book.repository';
import { AbstractQuery } from '../common/abstract.query';

export class BookQuery extends AbstractQuery<BookRepository> {

    public findAllBooksQuery = (): GraphQLFieldConfig => ({
        type: new GraphQLList(BookType),
        resolve: (root, args) => {
            log.debug('resolve findAllAuthors()');
            return this.repo.findAllBooks();
        }
    })

    public findBookByIdQuery = (): GraphQLFieldConfig => ({
        type: BookType,
        args: {
            id: { type: new GraphQLNonNull(GraphQLID) }
        },
        resolve: (root, args: arguments.ID) => {
            log.debug('resolve findAuthorById(%s)', args.id);
            return this.repo.findBookById(args.id);
        }
    })

}
