import { GraphQLID, GraphQLFieldConfig, GraphQLNonNull } from 'graphql';

import { models } from 'models';
import { RootValue } from '../../root-value';
import { Context } from '../../context/context';
import { BookType } from './book.type';
import { AbstractQuery, IGraphQLQuery } from '../abstract.query';

import { Logger } from '../../core/logger';
const log = Logger('app:schemas:book:FindBookByIdQuery');


export class FindBookByIdQuery extends AbstractQuery implements GraphQLFieldConfig, IGraphQLQuery {

    public type = BookType;
    public allow = ['admin'];
    public args = {
        id: { type: new GraphQLNonNull(GraphQLID) }
    };

    public before(context: Context, args: arguments.ID): Promise<arguments.ID> {
        log.debug('hook before args', args);
        return Promise.resolve(args);
    }

    public execute(root: RootValue, args: arguments.ID, context: Context): Promise<models.book.Attributes> {
        log.debug('resolve findBookById(%s)', args.id);
        return context.Repositories.BookRepository.findBookById(args.id);
    }

    public after(result: models.book.Attributes, context: Context, args: arguments.ID): Promise<models.book.Attributes> {
        log.debug('hook after args', args);
        return Promise.resolve(result);
    }

}
