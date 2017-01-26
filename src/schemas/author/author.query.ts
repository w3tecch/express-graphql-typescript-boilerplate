import {
    GraphQLID,
    GraphQLString,
    GraphQLList,
    GraphQLFieldConfig,
    GraphQLNonNull
} from 'graphql';
import { Request } from 'express';

import { Logger } from '../../core/logger';
const log = Logger('app:schemas:author:query');

import { AuthorType } from './author.type';
import { getAuthor, getAuthors } from '../../repositories/author/author.read';

export const getAuthorsQuery = (): GraphQLFieldConfig => ({
    type: new GraphQLList(AuthorType),
    // args: {}, here u can add filters and orders
    resolve: (root, args) => {
        log.debug('resolve getAuthors()');
        return getAuthors();
    }
});

export const getAuthorQuery = (): GraphQLFieldConfig => ({
    type: AuthorType,
    args: {
        id: { type: GraphQLID }
    },
    resolve: (root, args: arguments.ID) => {
        log.debug('resolve getAuthor(%s)', args.id);
        return getAuthor(args.id);
    }
});

