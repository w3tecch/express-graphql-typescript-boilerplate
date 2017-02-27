
import {
    GraphQLID,
    GraphQLFieldConfig,
    GraphQLNonNull
} from 'graphql';

import { Context } from '../../context';
import { AuthorType } from './author.type';
import { AbstractQuery, IGraphQLQuery } from '../abstract.query';

import { Logger } from '../../core/logger';
const log = Logger('app:schemas:author:FindAuthorByIdQuery');


export class FindAuthorByIdQuery extends AbstractQuery implements GraphQLFieldConfig, IGraphQLQuery {

    public type = AuthorType;

    public allow = ['admin'];

    public args = {
        id: { type: new GraphQLNonNull(GraphQLID) }
    };

    public before(context: Context, args: arguments.ID) {
        log.debug('hook before args', args);
        return Promise.resolve(args);
    }

    public after(result: any, context: Context, args: any, source?: any) {
        log.debug('hook after args', args);
        log.debug('hook after source', source);
        return Promise.resolve(result);
    }

    public execute(root, args: arguments.ID, context: Context) {
        log.debug('resolve findAuthorById(%s)', args.id);
        return context.repos.author.findAuthorById(args.id);
    }

}
