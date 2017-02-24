import {
    GraphQLID,
    GraphQLList,
    GraphQLFieldConfig,
    GraphQLNonNull
} from 'graphql';

import { Logger } from '../../core/logger';
const log = Logger('app:schemas:author:query');

import { AuthorType } from './author.type';
import { AuthorRepository } from '../../repositories/author.repository';
import { AbstractQuery } from '../common/abstract.query';

export class AuthorQuery extends AbstractQuery<AuthorRepository> {

    public findAllAuthorsQuery = (): GraphQLFieldConfig => ({
        type: new GraphQLList(AuthorType),
        resolve: () => {
            log.debug('resolve findAllAuthors()');
            return this.repo.findAllAuthors();
        }
    })

    public findAuthorByIdQuery = (): GraphQLFieldConfig => ({
        type: AuthorType,
        args: {
            id: { type: new GraphQLNonNull(GraphQLID) }
        },
        resolve: (root, args: arguments.ID) => {
            log.debug('resolve findAuthorById(%s)', args.id);
            return this.repo.findAuthorById(args.id);
        }
    })

}
