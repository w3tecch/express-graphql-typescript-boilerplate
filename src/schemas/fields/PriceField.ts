import { GraphQLFieldDefinition, GraphQLFloat } from 'graphql';


export class PriceField implements GraphQLFieldDefinition {

    public type = GraphQLFloat;
    public name = 'price';
    public description = 'The price';
    public args;

}
