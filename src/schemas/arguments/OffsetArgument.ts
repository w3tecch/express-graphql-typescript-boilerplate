import { GraphQLArgumentConfig, GraphQLInt } from 'graphql';

import { Utils } from '../../common/utils';
import { ValidationException } from '../../exceptions';


export class OffsetArgument implements GraphQLArgumentConfig {

    public type = GraphQLInt;
    public description = 'To do';
    public defaultValue = 0;

    static validate(offset: number): void {
        if (!Utils.isPositve(offset)) {
            throw new ValidationException('Offset must be positive');
        }
    }

}
