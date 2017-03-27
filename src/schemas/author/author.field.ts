import { GraphQLFieldDefinition } from 'graphql';

import { models } from 'models';
import { Context } from '../../context/context';
import { AbstractField, IGraphQLField } from '../abstract.field';
import { AuthorType } from '../author/author.type';
import { Book } from '../../models/book.model';

import { Logger } from '../../core/logger';
const log = Logger('app:schemas:author:AuthorField');


export class AuthorField extends AbstractField implements GraphQLFieldDefinition, IGraphQLField {

    public type = AuthorType;
    public name = 'author';
    public description = 'The author of this book';
    public args;

    public execute(source: Book, args: any, context: Context): Promise<models.author.Attributes>
    public execute(source: any, args: any, context: Context): Promise<models.author.Attributes> {
        log.debug('Resolve auhtor %s of the book ' + source.id, source.authorId);

        // Repo way
        // return context.getRepositories().getAuthorRepository().findAuthorById(source.authorId);

        // DataLoader
        return context.DataLoaders.AuthorDataLoader.load(source.authorId);

        // Benchmark with 1000 Authors and per Author 10 Books
        // With Loaders => ca. 2s
        // Without Loaders => ca. 4s
    }

}
