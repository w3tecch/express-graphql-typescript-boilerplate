import { GraphQLObjectType, GraphQLSchema } from 'graphql';

import { handlingErrors } from '../core/graphql-error-handling';


/**
 * Queries
 */
import { helloQuery } from './hello/hello.query';
import { findAllAuthorsQuery, findAuthorByIdQuery } from './author/author.query';

const RootQuery: GraphQLObjectType = new GraphQLObjectType({
    name: 'Query',
    fields: {
        hello: helloQuery(),
        findAllAuthors: findAllAuthorsQuery(),
        findAuthorById: findAuthorByIdQuery()
    }
});


// /**
//  * Mutations
//  */
// import { createAuthorMutation } from './author/author.mutation';

// const RootMutation: GraphQLObjectType = new GraphQLObjectType({
//     name: 'Mutation',
//     fields: {
//         createAuthor: createAuthorMutation()
//     }
// });


/**
 * Export schema with all queries and mutations
 */
export const schema = new GraphQLSchema({
    query: RootQuery
    // mutation: RootMutation
});

// Handles internal erros and prints the stack to the console
handlingErrors(schema);
