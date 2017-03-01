import { GraphQLFieldDefinition, GraphQLList } from 'graphql';

import { Context } from '../../context';
import { AbstractField, IGraphQLField } from '../abstract.field';
import { BookType } from '../book/book.type';
import { Author } from '../../models/author.model';

import { Logger } from '../../core/logger';
const log = Logger('app:schemas:book:BooksField');


export class BooksField extends AbstractField implements GraphQLFieldDefinition, IGraphQLField {

    public type = new GraphQLList(BookType);
    public name = 'books';
    public description = 'The books of an author';
    public args;

    public execute(source: Author, args, context: Context)
    public execute(source: any, args, context: Context) {
        log.debug('Resolve books of auhtor %s ' + source.id);
        return context.repos.book.findBookByAuthorId(source.id);
    }

}
