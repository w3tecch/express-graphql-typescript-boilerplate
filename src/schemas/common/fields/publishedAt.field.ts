import { GraphQLFieldDefinition } from 'graphql';

import { DateType } from '../types/date.type';


export class PublishedAtField implements GraphQLFieldDefinition {

    public type = DateType;
    public name = 'published ad';
    public description = 'This is the date when the object was published';
    public args;

}
