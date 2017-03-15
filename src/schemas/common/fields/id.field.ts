import { GraphQLFieldDefinition, GraphQLID } from 'graphql';


export class IdField implements GraphQLFieldDefinition {

    public type = GraphQLID;
    public name = 'id';
    public description = 'The ID';
    public args;

}
