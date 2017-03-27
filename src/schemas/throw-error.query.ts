import { GraphQLList, GraphQLFieldConfig } from 'graphql';

import { models } from 'models';
import { RootValue } from '../root-value';
import { Context } from '../context/context';
import { AuthorType } from './author/author.type';
import { AbstractQuery, IGraphQLQuery } from './abstract.query';

import { Logger } from '../core/logger';
const log = Logger('app:schemas:ThrowErrorQuery');


export class ThrowErrorQuery extends AbstractQuery implements GraphQLFieldConfig, IGraphQLQuery {

    public type = new GraphQLList(AuthorType);
    public allow = [];
    public args = {};

    public execute(root: RootValue, args: common.PageinationArguments, context: Context): Promise<models.author.Attributes> {
        log.debug('resolve throwError()');
        throw new Error('Internal Error - should only be in the console with the stack');
    }

}
