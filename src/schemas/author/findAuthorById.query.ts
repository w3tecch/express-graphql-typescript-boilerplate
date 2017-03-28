import {
    GraphQLID,
    GraphQLFieldConfig,
    GraphQLNonNull
} from 'graphql';

import { models } from 'models';
import { RootValue } from '../../root-value';
import { Context } from '../../context/context';
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

    public before(context: Context<arguments.ID>, args: arguments.ID): Promise<arguments.ID> {
        log.debug('hook before args', args);
        return Promise.resolve(args);
    }

    public execute(root: RootValue, args: arguments.ID, context: Context<arguments.ID>): Promise<models.author.Attributes> {
        log.debug('resolve findAuthorById(%s)', args.id);
        return context.Repositories.AuthorRepository.findAuthorById(args.id);
    }

}
