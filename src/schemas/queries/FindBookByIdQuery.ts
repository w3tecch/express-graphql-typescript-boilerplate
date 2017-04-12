import { GraphQLID, GraphQLFieldConfig, GraphQLNonNull } from 'graphql';

import { models } from 'models';
import { Logger } from '../../core';
import { RootValue } from '../../RootValue';
import { Context } from '../../context';
import { BookType } from '../types';
import { AbstractQuery, IGraphQLQuery } from './AbstractQuery';


export class FindBookByIdQuery extends AbstractQuery implements GraphQLFieldConfig, IGraphQLQuery {

    public log = Logger('app:schemas:book:FindBookByIdQuery');

    public type = BookType;
    public allow = ['admin'];
    public args = {
        id: { type: new GraphQLNonNull(GraphQLID) }
    };

    public before(context: Context<arguments.ID>, args: arguments.ID): Promise<arguments.ID> {
        this.log.debug('hook before args', args);
        return Promise.resolve(args);
    }

    public execute(root: RootValue, args: arguments.ID, context: Context<arguments.ID>): Promise<models.book.Attributes> {
        this.log.debug('resolve findBookById(%s)', args.id);
        return context.Repositories.BookRepository.findBookById(args.id);
    }

    public after(result: models.book.Attributes, context: Context<arguments.ID>, args: arguments.ID): Promise<models.book.Attributes> {
        this.log.debug('hook after args', args);
        return Promise.resolve(result);
    }

}
