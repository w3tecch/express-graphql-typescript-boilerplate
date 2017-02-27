import { GraphQLList, GraphQLFieldConfig } from 'graphql';

import { Context } from '../../context';
import { AuthorType } from './author.type';
import { AbstractQuery, IGraphQLQuery } from '../abstract.query';

import { Logger } from '../../core/logger';
const log = Logger('app:schemas:author:FindAllAuthorsQuery');


export class FindAllAuthorsQuery extends AbstractQuery implements GraphQLFieldConfig, IGraphQLQuery {

    public type = new GraphQLList(AuthorType);

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
        log.debug('resolve findAllAuthors()');
        return context.repos.author.findAllAuthors();
    }
}
