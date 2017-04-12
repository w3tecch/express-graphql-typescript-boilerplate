import { name } from 'faker';

import { AuthorModel } from '../../models/AuthorModel';


export const makeAuthor = (): AuthorModel => {
    return (new AuthorModel())
        .setFirstName(name.firstName())
        .setLastName(name.lastName());
};
