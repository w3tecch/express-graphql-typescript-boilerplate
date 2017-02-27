import { GraphQLArgumentConfig, GraphQLInt } from 'graphql';

import { Utils } from '../../../common/utils';
import { UserError } from '../../../core/graphql-error-handling';


export class OffsetArgument implements GraphQLArgumentConfig {

    public type = GraphQLInt;
    public description = 'To do';
    public defaultValue = 0;

    static verify(offset: number) {
        if (!Utils.isPosiitve(offset)) {
            throw new UserError('Offset must be positive');
        }
    }

}
