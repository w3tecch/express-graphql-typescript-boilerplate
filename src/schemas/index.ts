import { GraphQLObjectType, GraphQLSchema } from 'graphql';

import { GraphQLErrorHandling } from '../core';
import {
    FindAllAuthorsQuery,
    FindAuthorByIdQuery,
    FindAllBooksQuery,
    FindBookByIdQuery,
    SearchQuery
} from './queries';
import {
    CreateAuthorMutation,
    DeleteAuthorMutation,
    UpdateAuthorMutation
} from './mutations';

export class Schema {

    private static instance: Schema;

    private rootQuery: GraphQLObjectType = new GraphQLObjectType({
        name: 'Query',
        fields: {
            search: new SearchQuery(),
            findAllAuthors: new FindAllAuthorsQuery(),
            findAuthorById: new FindAuthorByIdQuery(),
            findAllBooks: new FindAllBooksQuery(),
            findBookById: new FindBookByIdQuery()
        }
    });

    private rootMutation: GraphQLObjectType = new GraphQLObjectType({
        name: 'Mutation',
        fields: {
            createAuthor: new CreateAuthorMutation(),
            updateAuthor: new UpdateAuthorMutation(),
            deleteAuthor: new DeleteAuthorMutation()
        }
    });

    private schema: GraphQLSchema = new GraphQLSchema({
        query: this.rootQuery,
        mutation: this.rootMutation
    });

    static getInstance(): Schema {
        if (!Schema.instance) {
            Schema.instance = new Schema();
            GraphQLErrorHandling.watch(Schema.instance.schema);
        }
        return Schema.instance;
    }

}
