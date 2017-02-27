import { GraphQLObjectType } from 'graphql';

import {
    IdField,
    FirstNameField,
    LastNameField
} from '../common/fields';


export const AuthorType = new GraphQLObjectType({
    name: 'Author',
    description: 'A single author.',
    fields: () => ({
        id: new IdField(),
        firstName: new FirstNameField(),
        lastName: new LastNameField()
    })
});
