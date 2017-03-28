import { GraphQLFieldDefinition, GraphQLString } from 'graphql';


export class LastNameField implements GraphQLFieldDefinition {

    public type = GraphQLString;
    public name = 'last name';
    public description = 'The last name';
    public args;

}
