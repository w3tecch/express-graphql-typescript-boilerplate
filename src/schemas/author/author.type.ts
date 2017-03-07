import { GraphQLObjectType } from 'graphql';

import {
    IdField,
    FirstNameField,
    LastNameField,
    UpdatedAtField,
    CreatedAtField
} from '../common/fields';
import { BooksField } from '../book/books.field';


export const AuthorType = new GraphQLObjectType({
    name: 'Author',
    description: 'A single author.',
    fields: () => ({
        id: new IdField(),
        firstName: new FirstNameField(),
        lastName: new LastNameField(),
        books: new BooksField(),
        updatedAt: new UpdatedAtField(),
        createdAt: new CreatedAtField()
    })
});
