import { GraphQLFieldDefinition, GraphQLString } from 'graphql';


export class DescriptionField implements GraphQLFieldDefinition {

    public type = GraphQLString;
    public name = 'description';
    public description = 'The description';
    public args;

}
