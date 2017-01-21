import {
    GraphQLObjectType,
    GraphQLSchema
} from 'graphql';

import { helloQuery } from './hello/hello.query';

const RootQuery: GraphQLObjectType = new GraphQLObjectType({
    name: 'Query',
    fields: {
        hello: helloQuery()
    }
});

// const RootMutation: GraphQLObjectType = new GraphQLObjectType({
//     name: 'Mutation',
//     fields: {

//     }
// });

export const schema = new GraphQLSchema({
    query: RootQuery
    // mutation: RootMutation
});
