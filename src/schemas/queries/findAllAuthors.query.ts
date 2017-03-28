import { GraphQLList, GraphQLFieldConfig } from 'graphql';

import { models } from 'models';
import { Logger } from '../../core';
import { RootValue } from '../../root-value';
import { Context } from '../../context';
import { AuthorType } from '../types';
import { LimitArgument, OffsetArgument } from '../arguments';
import { AbstractQuery, IGraphQLQuery } from './abstract.query';


export class FindAllAuthorsQuery extends AbstractQuery implements GraphQLFieldConfig, IGraphQLQuery {

    public log = Logger('app:schemas:author:FindAllAuthorsQuery');

    public type = new GraphQLList(AuthorType);
    public allow = ['admin'];
    public args = {
        limit: new LimitArgument(),
        offset: new OffsetArgument()
    };

    public before(context: Context<common.PageinationArguments>, args: common.PageinationArguments): Promise<common.PageinationArguments> {
        this.log.debug('hook before args', args);
        LimitArgument.validate(args.limit);
        OffsetArgument.validate(args.limit);
        return Promise.resolve(args);
    }

    public execute(root: RootValue, args: common.PageinationArguments, context: Context<common.PageinationArguments>): Promise<models.author.Attributes> {
        this.log.debug('resolve findAllAuthors()');
        return context.Repositories.AuthorRepository.findAllAuthors({
            limit: args.limit,
            offset: args.offset
        });
    }

}
