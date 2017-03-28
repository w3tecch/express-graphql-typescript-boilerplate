import {
    GraphQLID,
    GraphQLFieldConfig,
    GraphQLNonNull
} from 'graphql';

import { models } from 'models';
import { Logger } from '../../core';
import { RootValue } from '../../root-value';
import { Context } from '../../context';

import { AuthorType } from './author.type';
import { AbstractQuery, IGraphQLQuery } from '../abstract.query';


export class FindAuthorByIdQuery extends AbstractQuery implements GraphQLFieldConfig, IGraphQLQuery {

    public log = Logger('app:schemas:author:FindAuthorByIdQuery');

    public type = AuthorType;
    public allow = ['admin'];
    public args = {
        id: { type: new GraphQLNonNull(GraphQLID) }
    };

    public before(context: Context<arguments.ID>, args: arguments.ID): Promise<arguments.ID> {
        this.log.debug('hook before args', args);
        return Promise.resolve(args);
    }

    public execute(root: RootValue, args: arguments.ID, context: Context<arguments.ID>): Promise<models.author.Attributes> {
        this.log.debug('resolve findAuthorById(%s)', args.id);
        return context.Repositories.AuthorRepository.findAuthorById(args.id);
    }

}
