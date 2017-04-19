import { GraphQLFieldDefinition, GraphQLString } from 'graphql';


export class TypeField implements GraphQLFieldDefinition {

    public type = GraphQLString;
    public name = 'type';
    public description = 'The items type';
    public args;

}
