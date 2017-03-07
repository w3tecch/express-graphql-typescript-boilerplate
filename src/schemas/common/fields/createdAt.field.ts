import { GraphQLFieldDefinition } from 'graphql';

import { DateType } from '../types/date.type';


export class CreatedAtField implements GraphQLFieldDefinition {

    public type = DateType;
    public name = 'created at';
    public description = 'This is the date when the object was created';
    public args;

}
