import { GraphQLFieldConfig, GraphQLNonNull, GraphQLString } from 'graphql';

import { models } from 'models';
import { RootValue } from '../../RootValue';
import { Logger } from '../../core';
import { Context } from '../../context';
import { ValidationException } from '../../exceptions';
import { AuthorType } from '../types';
import { AuthorModel } from '../../models';
import { AbstractMutation, IGraphQLMutation } from './AbstractMutation';


export interface ICreateAuthorMutationArguments {
    firstName: string;
    lastName: string;
}

export class CreateAuthorMutation extends AbstractMutation implements GraphQLFieldConfig, IGraphQLMutation {

    public log = Logger('app:schemas:author:CreateAuthorMutation');

    public type = AuthorType;
    public allow = ['admin'];
    public args = {
        firstName: { type: new GraphQLNonNull(GraphQLString) },
        lastName: { type: new GraphQLNonNull(GraphQLString) }
    };

    public before(context: Context<ICreateAuthorMutationArguments>, args: ICreateAuthorMutationArguments): Promise<ICreateAuthorMutationArguments> {
        this.log.debug('hook before args', args);
        const authorModel = new AuthorModel()
            .setFirstName(args.firstName)
            .setLastName(args.lastName);

        if (authorModel.validate()) {
            return Promise.resolve(args);
        } else {
            throw new ValidationException('Invalid author');
        }
    }

    public async execute(
        root: RootValue,
        args: ICreateAuthorMutationArguments,
        context: Context<ICreateAuthorMutationArguments>
    ): Promise<models.author.Attributes> {
        this.log.debug('resolve createAuthor()');
        const authorModel = new AuthorModel()
            .setFirstName(args.firstName)
            .setLastName(args.lastName);
        const author = await context.Services.AuthorService.create(authorModel);
        return author.toJson();
    }
}
