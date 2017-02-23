import { GraphQLObjectType, GraphQLSchema } from 'graphql';

import { handlingErrors } from '../core/graphql-error-handling';
import { db } from '../core/database';

/**
 * Queries
 */
import { helloQuery } from './hello/hello.query';

import { AuthorRepository } from '../repositories/author.repository';
import { AuthorBuilder } from '../builders/author.builder';
import { AuthorQuery } from '../schemas/author/author.query';

const authorQuery = new AuthorQuery(new AuthorRepository(db));

const RootQuery: GraphQLObjectType = new GraphQLObjectType({
    name: 'Query',
    fields: {
        hello: helloQuery(),
        findAllAuthors: authorQuery.findAllAuthorsQuery(),
        findAuthorById: authorQuery.findAuthorByIdQuery()
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
