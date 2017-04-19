import { AbstractQuery, IGraphQLQuery } from '../queries/AbstractQuery';

export interface IGraphQLMutation extends IGraphQLQuery {
}

export class AbstractMutation extends AbstractQuery {
}
