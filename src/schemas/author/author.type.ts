import {
    GraphQLID,
    GraphQLString,
    GraphQLObjectType
} from 'graphql';


export const AuthorType = new GraphQLObjectType({
    name: 'Author',
    description: 'A single author.',
    fields: () => ({
        id: {
            type: GraphQLID,
            description: 'The ID'
        },
        firstName: {
            type: GraphQLString,
            description: 'The first name of the author.'
        },
        lastName: {
            type: GraphQLString,
            description: 'The last name of the author.'
        }
    })
});
