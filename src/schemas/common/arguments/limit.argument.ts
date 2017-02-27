import { GraphQLArgumentConfig, GraphQLInt } from 'graphql';

import { Utils } from '../../../common/utils';
import { UserError } from '../../../core/graphql-error-handling';


export class LimitArgument implements GraphQLArgumentConfig {

    public type = GraphQLInt;
    public description = 'This is the max amount of data that should be send to the client';
    public defaultValue = 100;

    static verify(limit: number) {
        if (!Utils.isPosiitve(limit)) {
            throw new UserError('Limit must be positive');
        }
    }

}
