import { models } from 'models';

import { db } from '../../core/database';
import { UserError } from '../../core/graphql-error';
import { AuthorModel } from '../../models/author.model';


export const createAuthor = async (newAuthor: models.author.Attributes): Promise<models.author.Instance> => {
    try {
        const author = await db.transaction(() => AuthorModel.create(newAuthor));
        return author;
    } catch (error) {
        throw new UserError(error.message);
    }
};
