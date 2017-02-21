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
import { findAllAuthors, findAuthorById } from '../../repositories/author';


export const findAllAuthorsQuery = (): GraphQLFieldConfig => ({
    type: new GraphQLList(AuthorType),
    // args: {}, here u can add filters and orders
    resolve: (root, args) => {
        log.debug('resolve findAllAuthors()');
        return findAllAuthors();
    }
});

export const findAuthorByIdQuery = (): GraphQLFieldConfig => ({
    type: AuthorType,
    args: {
        id: { type: GraphQLID }
    },
    resolve: (root, args: arguments.ID) => {
        log.debug('resolve findAuthorById(%s)', args.id);
        return findAuthorById(args.id);
    }
});

