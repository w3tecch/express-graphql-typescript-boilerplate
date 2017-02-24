import {
    GraphQLID,
    GraphQLString,
    GraphQLFloat,
    GraphQLObjectType
} from 'graphql';


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
        }
    })
});
