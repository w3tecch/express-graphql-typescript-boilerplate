import { GraphQLObjectType, GraphQLSchema } from 'graphql';

import { handlingErrors } from '../core/graphql-error-handling';
import { db } from '../core/database';

/**
 * Queries
 */
import { helloQuery } from './hello/hello.query';

import { AuthorRepository } from '../repositories/author.repository';
import { AuthorQuery } from '../schemas/author/author.query';

import { BookRepository } from '../repositories/book.repository';
import { BookQuery } from '../schemas/book/book.query';

const authorQuery = new AuthorQuery(new AuthorRepository(db));
const bookQuery = new BookQuery(new BookRepository(db));

/**
 * RootQuery
 *
 * This will be published to the clients
 */
const RootQuery: GraphQLObjectType = new GraphQLObjectType({
    name: 'Query',
    fields: {
        hello: helloQuery(),
        findAllAuthors: authorQuery.findAllAuthorsQuery(),
        findAuthorById: authorQuery.findAuthorByIdQuery(),
        findAllBooks: bookQuery.findAllBooksQuery(),
        findBookById: bookQuery.findBookByIdQuery()
    }
});


// /**
//  * Mutations
//  */
// import { createAuthorMutation } from './author/author.mutation';

// /**
//  * RootMutation
//  *
//  * This will be published to the clients
//  */
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
