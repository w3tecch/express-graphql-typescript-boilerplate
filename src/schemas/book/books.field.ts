import { GraphQLFieldDefinition, GraphQLList } from 'graphql';

import { models } from 'models';
import { Context } from '../../context/context';
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

    public execute(source: Author, args: any, context: Context<any>): Promise<models.book.Attributes>
    public execute(source: any, args: any, context: Context<any>): Promise<models.book.Attributes> {
        log.debug('Resolve books of auhtor %s ' + source.id);
        return context.Repositories.BookRepository.findBookByAuthorId(source.id);
    }

}
