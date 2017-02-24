import {
    GraphQLID,
    GraphQLList,
    GraphQLFieldConfig,
    GraphQLNonNull
} from 'graphql';

import { Logger } from '../../core/logger';
import { Context } from '../../context';
const log = Logger('app:schemas:author:query');

import { AuthorType } from './author.type';

export class AuthorQuery {

    public findAllAuthorsQuery = (): GraphQLFieldConfig => ({
        type: new GraphQLList(AuthorType),
        resolve: (root, args, context: Context) => {
            log.debug('resolve findAllAuthors()');
            return context.repos.author.findAllAuthors();
        }
    })

    public findAuthorByIdQuery = (): GraphQLFieldConfig => ({
        type: AuthorType,
        args: {
            id: { type: new GraphQLNonNull(GraphQLID) }
        },
        resolve: (root, args: arguments.ID, context: Context) => {
            log.debug('resolve findAuthorById(%s)', args.id);
            return context.repos.author.findAuthorById(args.id);
        }
    })

}
