import { GraphQLFieldDefinition, GraphQLString } from 'graphql';


export class FirstNameField implements GraphQLFieldDefinition {

    public type = GraphQLString;
    public name = 'first name';
    public description = 'The first name';
    public args;

}
