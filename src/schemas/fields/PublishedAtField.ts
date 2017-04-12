import { GraphQLFieldDefinition } from 'graphql';

import { DateType } from '../types/DateType';


export class PublishedAtField implements GraphQLFieldDefinition {

    public type = DateType;
    public name = 'published at';
    public description = 'This is the date when the object was published';
    public args;

}
