import { name } from 'faker';

import { AuthorBuilder } from '../../builders/author.builder';


export const makeAuthor = (): AuthorBuilder => {
    return (new AuthorBuilder())
        .setFirstName(name.firstName())
        .setLastName(name.lastName());
};
