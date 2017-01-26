import {
    GraphQLString,
    GraphQLFieldConfig
} from 'graphql';


export const helloQuery = (): GraphQLFieldConfig => ({
    type: GraphQLString,
    resolve: (root, args) => root.hello()
});
