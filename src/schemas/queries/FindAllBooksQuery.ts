import { GraphQLList, GraphQLFieldConfig } from 'graphql';

import { models } from 'models';
import { Logger } from '../../core';
import { RootValue } from '../../RootValue';
import { Context } from '../../context';
import { BookType } from '../types';
import { LimitArgument, OffsetArgument } from '../arguments';
import { AbstractQuery, IGraphQLQuery } from './AbstractQuery';


export class FindAllBooksQuery extends AbstractQuery implements GraphQLFieldConfig, IGraphQLQuery {

    public log = Logger('app:schemas:book:FindAllBooksQuery');

    public type = new GraphQLList(BookType);
    public allow = ['admin'];
    public args = {
        limit: new LimitArgument(),
        offset: new OffsetArgument()
    };

    public before(context: Context<common.PageinationArguments>, args: common.PageinationArguments): Promise<common.PageinationArguments> {
        this.log.debug('hook before args', args);
        LimitArgument.validate(args.limit);
        OffsetArgument.validate(args.limit);
        return Promise.resolve(args);
    }

    public async execute(root: RootValue, args: common.PageinationArguments, context: Context<common.PageinationArguments>): Promise<models.book.Attributes> {
        this.log.debug('resolve findAllBooks()');
        const books = await context.Services.BookService.findAll({
            limit: args.limit,
            offset: args.offset
        });
        return books.map(book => book.toJson());
    }

    public after(result: models.book.Attributes, context: Context<common.PageinationArguments>): Promise<models.book.Attributes> {
        this.log.debug('hook after args', context.Args);
        return Promise.resolve(result);
    }
}
