import { GraphQLArgumentConfig, GraphQLString, GraphQLNonNull } from 'graphql';

import { UserError } from '../../../core/graphql-error-handling';


export interface ITextArgument {
    text: string;
}

export class TextArgument implements GraphQLArgumentConfig {

    public type = new GraphQLNonNull(GraphQLString);
    public description = 'This argument is used for the search query';

    static verify(text: string) {
        if (text.length < 3) {
            throw new UserError('The text argument must have at least 3 characters');
        }
        if (text.indexOf('%') >= 0) {
            throw new UserError('% is not a valid search character');
        }
    }

}
