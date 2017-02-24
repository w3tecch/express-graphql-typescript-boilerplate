import {
    GraphQLID,
    GraphQLList,
    GraphQLFieldConfig,
    GraphQLNonNull
} from 'graphql';

import { Context } from '../../context';
import { Logger } from '../../core/logger';
const log = Logger('app:schemas:book:query');

import { BookType } from './book.type';

export class BookQuery {

    public findAllBooksQuery = (): GraphQLFieldConfig => ({
        type: new GraphQLList(BookType),
        resolve: (root, args, context: Context) => {
            log.debug('resolve findAllAuthors()');
            return  context.repos.book.findAllBooks();
        }
    })

    public findBookByIdQuery = (): GraphQLFieldConfig => ({
        type: BookType,
        args: {
            id: { type: new GraphQLNonNull(GraphQLID) }
        },
        resolve: (root, args: arguments.ID, context: Context) => {
            log.debug('resolve findAuthorById(%s)', args.id);
            return context.repos.book.findBookById(args.id);
        }
    })

}
