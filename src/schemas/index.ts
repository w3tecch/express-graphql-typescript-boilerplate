import { GraphQLObjectType, GraphQLSchema } from 'graphql';

import { GraphQLErrorHandling } from '../core';


/**
 * Queries
 */
import {
    FindAllAuthorsQuery,
    FindAuthorByIdQuery,
    FindAllBooksQuery,
    FindBookByIdQuery,
    SearchQuery
} from './queries';

/**
 * RootQuery
 *
 * This will be published to the clients
 */
const RootQuery: GraphQLObjectType = new GraphQLObjectType({
    name: 'Query',
    fields: {
        search: new SearchQuery(),
        findAllAuthors: new FindAllAuthorsQuery(),
        findAuthorById: new FindAuthorByIdQuery(),
        findAllBooks: new FindAllBooksQuery(),
        findBookById: new FindBookByIdQuery()
    }
});


/**
 * Mutations
 */
import {
    CreateAuthorMutation,
    DeleteAuthorMutation,
    UpdateAuthorMutation
} from './mutations';

/**
 * RootMutation
 *
 * This will be published to the clients
 */
const RootMutation: GraphQLObjectType = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        createAuthor: new CreateAuthorMutation(),
        updateAuthor: new UpdateAuthorMutation(),
        deleteAuthor: new DeleteAuthorMutation()
    }
});


/**
 * Export schema with all queries and mutations
 */
export const schema = new GraphQLSchema({
    query: RootQuery,
    mutation: RootMutation
});

// Handles internal erros and prints the stack to the console
GraphQLErrorHandling.watch(schema);
