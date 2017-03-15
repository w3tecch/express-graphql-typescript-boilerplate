import { GraphQLList, GraphQLFieldConfig } from 'graphql';

import { Context } from '../../context/context';
import { AuthorType } from './author.type';
import { AbstractQuery, IGraphQLQuery } from '../abstract.query';
import { LimitArgument, OffsetArgument } from '../common/arguments';

import { Logger } from '../../core/logger';
const log = Logger('app:schemas:author:FindAllAuthorsQuery');


export class FindAllAuthorsQuery extends AbstractQuery implements GraphQLFieldConfig, IGraphQLQuery {

    public type = new GraphQLList(AuthorType);

    public allow = ['admin'];

    public args = {
        limit: new LimitArgument(),
        offset: new OffsetArgument()
    };

    public before(context: Context, args: common.PageinationArguments) {
        log.debug('hook before args', args);
        LimitArgument.verify(args.limit);
        OffsetArgument.verify(args.limit);
        return Promise.resolve(args);
    }

    public after(result: any, context: Context, args: any, source?: any) {
        log.debug('hook after args', args);
        log.debug('hook after source', source);
        return Promise.resolve(result);
    }

    public execute(root, args: common.PageinationArguments, context: Context) {
        log.debug('resolve findAllAuthors()');
        return context.Repositories.AuthorRepository.findAllAuthors({
            limit: args.limit,
            offset: args.offset
        });
    }
}
