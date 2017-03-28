import { GraphQLList, GraphQLFieldConfig } from 'graphql';

import { models } from 'models';
import { RootValue } from '../../root-value';
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

    public before(context: Context<common.PageinationArguments>, args: common.PageinationArguments): Promise<common.PageinationArguments> {
        log.debug('hook before args', args);
        LimitArgument.validate(args.limit);
        OffsetArgument.validate(args.limit);
        return Promise.resolve(args);
    }

    public execute(root: RootValue, args: common.PageinationArguments, context: Context<common.PageinationArguments>): Promise<models.author.Attributes> {
        log.debug('resolve findAllAuthors()');
        return context.Repositories.AuthorRepository.findAllAuthors({
            limit: args.limit,
            offset: args.offset
        });
    }

}
