import {
    GraphQLObjectType,
    GraphQLSchema
} from 'graphql';

import { handlingErrors } from '../core/graphql-error';

import { helloQuery } from './hello/hello.query';
import { internalErrorQuery, userErrorQuery } from './error/error.query';

const RootQuery: GraphQLObjectType = new GraphQLObjectType({
    name: 'Query',
    fields: {
        hello: helloQuery(),
        internalError: internalErrorQuery(),
        userError: userErrorQuery()
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

handlingErrors(schema);
