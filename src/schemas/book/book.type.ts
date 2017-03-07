import { GraphQLObjectType } from 'graphql';

import {
    IdField,
    TitleField,
    DescriptionField,
    PriceField,
    PublishedAtField,
    UpdatedAtField,
    CreatedAtField
} from '../common/fields';
import { AuthorField } from '../author/author.field';


export const BookType = new GraphQLObjectType({
    name: 'Book',
    description: 'A single book.',
    fields: () => ({
        id: new IdField(),
        title: new TitleField(),
        description: new DescriptionField(),
        price: new PriceField(),
        autor: new AuthorField(),
        publishedAt: new PublishedAtField(),
        updatedAt: new UpdatedAtField(),
        createdAt: new CreatedAtField()
    })
});
