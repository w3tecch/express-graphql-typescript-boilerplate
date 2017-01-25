import {
    GraphQLString,
    GraphQLFieldConfig,
    GraphQLError
} from 'graphql';

import { UserError } from '../../core/graphql-error';

export const internalErrorQuery = (): GraphQLFieldConfig => ({
    type: GraphQLString,
    resolve: (root, args) => {
        throw new Error('Test Error');
    }
});

export const userErrorQuery = (): GraphQLFieldConfig => ({
    type: GraphQLString,
    resolve: (root, args) => {
        throw new UserError('User Error Test');
    }
});
