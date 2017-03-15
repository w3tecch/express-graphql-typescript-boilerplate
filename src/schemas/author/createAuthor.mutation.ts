import { GraphQLFieldConfig, GraphQLNonNull, GraphQLString } from 'graphql';

import { Context } from '../../context/context';
import { AuthorType } from './author.type';
import { AbstractMutation, IGraphQLMutation } from '../abstract.mutation';
import { AuthorModel } from '../../models/author.model';

import { Logger } from '../../core/logger';
const log = Logger('app:schemas:author:CreateAuthorMutation');


export interface ICreateAuthorMutationArguments {
    firstName: string;
    lastName: string;
}

export class CreateAuthorMutation extends AbstractMutation implements GraphQLFieldConfig, IGraphQLMutation {

    public type = AuthorType;

    public allow = ['admin'];

    public args = {
        firstName: { type: new GraphQLNonNull(GraphQLString) },
        lastName: { type: new GraphQLNonNull(GraphQLString) }
    };

    public before(context: Context, args: ICreateAuthorMutationArguments) {
        log.debug('hook before args', args);
        const authorModel = new AuthorModel()
            .setFirstName(args.firstName)
            .setLastName(args.lastName);

        if (authorModel.validate()) {
            return Promise.resolve(args);
        } else {

        }
    }

    public execute(root, args: ICreateAuthorMutationArguments, context: Context) {
        log.debug('resolve createAuthor()');
        const authorModel = new AuthorModel()
            .setFirstName(args.firstName)
            .setLastName(args.lastName);
        return context.Repositories.AuthorRepository.createAuthor(authorModel);
    }
}
