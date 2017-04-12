import { GraphQLList, GraphQLFieldConfig, GraphQLResolveInfo } from 'graphql';
import * as _ from 'lodash';

import { RootValue } from '../../RootValue';
import { Logger } from '../../core';
import { Context } from '../../context';
import { SearchType } from '../types';
import { TextArgument, ITextArgument } from '../arguments';
import { AbstractQuery, IGraphQLQuery } from './AbstractQuery';


/**
 * @example
 * query search($text: String!) {
 *  search(text: $text) {
 *     __typename
 *     ... on Author {
 *       id
 *       firstName
 *       lastName
 *     }
 *     ... on Book {
 *       title
 *     }
 *   }
 * }
 */
export class SearchQuery extends AbstractQuery implements GraphQLFieldConfig, IGraphQLQuery {

    public log = Logger('app:schemas:search:SearchQuery');

    public type = new GraphQLList(SearchType);
    public allow = ['admin'];
    public args = {
        text: new TextArgument()
    };

    public before(context: Context<ITextArgument>, args: ITextArgument): Promise<ITextArgument> {
        TextArgument.validate(args.text);
        return Promise.resolve(args);
    }

    public async execute<T>(root: RootValue, args: ITextArgument, context: Context<ITextArgument>, info: GraphQLResolveInfo): Promise<T[]> {
        this.log.debug('resolve search()', args.text);
        const [authors, books] = await Promise.all([
            context.Repositories.AuthorRepository.searchAuthors(args.text),
            context.Repositories.BookRepository.searchBooks(args.text)
        ]);
        const results = _.union<any>(authors, books);
        return _.sortBy(results, 'updatedAt').reverse();
    }
}
