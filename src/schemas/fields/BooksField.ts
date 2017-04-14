import { GraphQLFieldDefinition, GraphQLList } from 'graphql';

import { models } from 'models';
import { Logger } from '../../core';
import { Context } from '../../context';

import { AbstractField, IGraphQLField } from './AbstractField';
import { BookType } from '../types';
import { Author } from '../../models';


export class BooksField extends AbstractField implements GraphQLFieldDefinition, IGraphQLField {

    public log = Logger('app:schemas:book:BooksField');

    public type = new GraphQLList(BookType);
    public name = 'books';
    public description = 'The books of an author';
    public args;

    public execute(source: Author, args: any, context: Context<any>): Promise<models.book.Attributes>
    public execute(source: any, args: any, context: Context<any>): Promise<models.book.Attributes> {
        this.log.debug('Resolve books of auhtor %s ' + source.id);
        return context.Services.BookService.findByAuthorId(source.id);
    }

}
