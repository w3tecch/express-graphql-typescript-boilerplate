import { AbstractQuery, IGraphQLQuery } from './abstract.query';

export interface IGraphQLMutation extends IGraphQLQuery {
}

export class AbstractMutation extends AbstractQuery {
}
