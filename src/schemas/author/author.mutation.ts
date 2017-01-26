import {
    GraphQLID,
    GraphQLString,
    GraphQLNonNull,
    GraphQLFieldConfig
} from 'graphql';
import { models } from 'models';

import { Logger } from '../../core/logger';
const log = Logger('app:schemas:author:mutation');

import { AuthorType } from './author.type';
import { createAuthor } from '../../repositories/author/author.create';

export const createAuthorMutation = (): GraphQLFieldConfig => ({
    type: AuthorType,
    args: {
        firstName: { type: new GraphQLNonNull(GraphQLString) },
        lastName: { type: new GraphQLNonNull(GraphQLString) }
    },
    resolve: (root, args: models.author.Attributes) => {
        log.debug('resolve createAuthor()', args);
        return createAuthor(args);
    }
});
