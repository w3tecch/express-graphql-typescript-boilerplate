import { AbstractQuery, IGraphQLQuery } from '../queries/abstract.query';

export interface IGraphQLMutation extends IGraphQLQuery {
}

export class AbstractMutation extends AbstractQuery {
}
