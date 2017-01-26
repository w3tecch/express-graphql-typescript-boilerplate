import { name } from 'faker';
import { models } from 'models';


export const makeAuthor = (): models.author.Attributes => ({
    firstName: name.firstName(),
    lastName: name.lastName()
});
