import { GraphQLUnionType } from 'graphql';

import { Author } from '../../models/author.model';
import { Book } from '../../models/book.model';
import { BookType } from '../book/book.type';
import { AuthorType } from '../author/author.type';


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
