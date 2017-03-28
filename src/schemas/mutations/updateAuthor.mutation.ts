import { GraphQLFieldConfig, GraphQLNonNull, GraphQLString, GraphQLID } from 'graphql';

import { models } from 'models';
import { Logger } from '../../core';
import { RootValue } from '../../root-value';
import { Context } from '../../context';
import { AuthorModel } from '../../models';
import { AuthorType } from '../types';
import { AbstractMutation, IGraphQLMutation } from './abstract.mutation';


export interface IUpdateAuthorMutationArguments {
    id: number;
    firstName: string;
    lastName: string;
}

export class UpdateAuthorMutation extends AbstractMutation implements GraphQLFieldConfig, IGraphQLMutation {

    public log = Logger('app:schemas:author:UpdateAuthorMutation');

    public type = AuthorType;
    public allow = ['admin'];
    public args = {
        id: { type: new GraphQLNonNull(GraphQLID) },
        firstName: { type: new GraphQLNonNull(GraphQLString) },
        lastName: { type: new GraphQLNonNull(GraphQLString) }
    };

    public execute(root: RootValue, args: IUpdateAuthorMutationArguments, context: Context<IUpdateAuthorMutationArguments>): Promise<models.author.Attributes> {
        this.log.debug('resolve updateAuthor(%s)', args.id);
        const authorModel = new AuthorModel()
            .setId(args.id)
            .setFirstName(args.firstName)
            .setLastName(args.lastName);
        return context.Repositories.AuthorRepository.updateAuthor(authorModel);
    }
}
