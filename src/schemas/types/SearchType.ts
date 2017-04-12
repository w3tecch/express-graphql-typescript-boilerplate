import { GraphQLUnionType } from 'graphql';

import { Book, Author } from '../../models';
import { BookType, AuthorType } from '../types';


export const SearchType = new GraphQLUnionType({
    name: 'SearchItem',
    types: [BookType, AuthorType],
    resolveType: (value: Book | Author) => {
        if (value instanceof Book) {
            return BookType;
        }
        if (value instanceof Author) {
            return AuthorType;
        }
    }
});
