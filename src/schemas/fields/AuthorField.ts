import { GraphQLFieldDefinition } from 'graphql';

import { models } from 'models';
import { Logger } from '../../core';
import { Context } from '../../context';
import { Book } from '../../models';

import { AbstractField, IGraphQLField } from './AbstractField';
import { AuthorType } from '../types';


export class AuthorField extends AbstractField implements GraphQLFieldDefinition, IGraphQLField {

    public log = Logger('app:schemas:author:AuthorField');

    public type = AuthorType;
    public name = 'author';
    public description = 'The author of this book';
    public args;

    public execute(source: Book, args: any, context: Context<any>): Promise<models.author.Attributes>
    public execute(source: any, args: any, context: Context<any>): Promise<models.author.Attributes> {
        this.log.debug('Resolve auhtor %s of the book ' + source.id, source.authorId);

        // Repo way
        // return context.getRepositories().getAuthorRepository().findAuthorById(source.authorId);

        // DataLoader
        return context.DataLoaders.AuthorDataLoader.load(source.authorId);

        // Benchmark with 1000 Authors and per Author 10 Books
        // With Loaders => ca. 2s
        // Without Loaders => ca. 4s
    }

}
