import { GraphQLFieldConfig, GraphQLNonNull, GraphQLID } from 'graphql';

import { Logger } from '../../core';
import { RootValue } from '../../root-value';
import { Context } from '../../context';
import { AuthorType } from '../types';
import { AbstractMutation, IGraphQLMutation } from './abstract.mutation';


export interface IDeleteAuthorMutationArguments {
    id: number;
}

export class DeleteAuthorMutation extends AbstractMutation implements GraphQLFieldConfig, IGraphQLMutation {

    public log = Logger('app:schemas:author:DeleteAuthorMutation');

    public type = AuthorType;
    public allow = ['admin'];
    public args = {
        id: { type: new GraphQLNonNull(GraphQLID) }
    };

    public execute(root: RootValue, args: IDeleteAuthorMutationArguments, context: Context<IDeleteAuthorMutationArguments>): Promise<void> {
        this.log.debug('resolve deleteAuthor(%s)', args.id);
        return context.Repositories.AuthorRepository.deleteAuthor(args.id);
    }
}
