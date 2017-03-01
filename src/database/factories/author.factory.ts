import { name } from 'faker';

import { AuthorModel } from '../../models/author.model';


export const makeAuthor = (): AuthorModel => {
    return (new AuthorModel())
        .setFirstName(name.firstName())
        .setLastName(name.lastName());
};
