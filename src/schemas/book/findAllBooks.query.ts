import { GraphQLList, GraphQLFieldConfig } from 'graphql';

import { Context } from '../../context';
import { BookType } from './book.type';
import { AbstractQuery, IGraphQLQuery } from '../abstract.query';

import { Logger } from '../../core/logger';
const log = Logger('app:schemas:book:FindAllBooksQuery');


export class FindAllBooksQuery extends AbstractQuery implements GraphQLFieldConfig, IGraphQLQuery {

    public type = new GraphQLList(BookType);

    public allow = ['admin'];

    public before(context: Context, args: arguments.ID) {
        log.debug('hook before args', args);
        return Promise.resolve(args);
    }

    public after(result: any, context: Context, args: any, source?: any) {
        log.debug('hook after args', args);
        log.debug('hook after source', source);
        return Promise.resolve(result);
    }

    public execute(root, args, context: Context) {
        log.debug('resolve findAllBooks()');
        return context.repos.book.findAllBooks();
    }
}
