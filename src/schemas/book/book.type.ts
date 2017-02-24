import {
    GraphQLID,
    GraphQLString,
    GraphQLFloat,
    GraphQLObjectType
} from 'graphql';

import { Context } from '../../context';
import { AuthorType } from '../author/author.type';
import { Book } from '../../builders/book.builder';

import { Logger } from '../../core/logger';
const log = Logger('app:schemas:book:type');

export const BookType = new GraphQLObjectType({
    name: 'Book',
    description: 'A single book.',
    fields: () => ({
        id: {
            type: GraphQLID,
            description: 'The ID'
        },
        title: {
            type: GraphQLString,
            description: 'The first name of the book.'
        },
        description: {
            type: GraphQLString,
            description: 'The first name of the book.'
        },
        price: {
            type: GraphQLFloat,
            description: 'The price of the book'
        },
        autor: {
            type: AuthorType,
            description: 'The author of this book',
            resolve: (source: Book, args, context: Context) => {
                log.debug('Resolve auhtor %s of the book ' + source.id, source.authorId);

                // return context.AuthorRepository.findAuthorById(source.authorId);

// app:response POST /? 200 250.376 ms - 7209
//   app:response  +103ms
                return context.loaders.author.load(source.authorId);

            }
        }
    })
});
