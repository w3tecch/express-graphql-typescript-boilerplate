import { GraphQLFieldConfig, GraphQLNonNull, GraphQLString, GraphQLID } from 'graphql';

import { models } from 'models';
import { RootValue } from '../../root-value';
import { Context } from '../../context/context';
import { AuthorType } from './author.type';
import { AbstractMutation, IGraphQLMutation } from '../abstract.mutation';
import { AuthorModel } from '../../models/author.model';

import { Logger } from '../../core/logger';
const log = Logger('app:schemas:author:UpdateAuthorMutation');


export interface IUpdateAuthorMutationArguments {
    id: number;
    firstName: string;
    lastName: string;
}

export class UpdateAuthorMutation extends AbstractMutation implements GraphQLFieldConfig, IGraphQLMutation {

    public type = AuthorType;
    public allow = ['admin'];
    public args = {
        id: { type: new GraphQLNonNull(GraphQLID) },
        firstName: { type: new GraphQLNonNull(GraphQLString) },
        lastName: { type: new GraphQLNonNull(GraphQLString) }
    };

    public execute(root: RootValue, args: IUpdateAuthorMutationArguments, context: Context<IUpdateAuthorMutationArguments>): Promise<models.author.Attributes> {
        log.debug('resolve updateAuthor(%s)', args.id);
        const authorModel = new AuthorModel()
            .setId(args.id)
            .setFirstName(args.firstName)
            .setLastName(args.lastName);
        return context.Repositories.AuthorRepository.updateAuthor(authorModel);
    }
}
