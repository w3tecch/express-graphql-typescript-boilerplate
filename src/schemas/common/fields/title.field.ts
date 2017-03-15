import { GraphQLFieldDefinition, GraphQLString } from 'graphql';


export class TitleField implements GraphQLFieldDefinition {

    public type = GraphQLString;
    public name = 'title';
    public description = 'The title';
    public args;

}
