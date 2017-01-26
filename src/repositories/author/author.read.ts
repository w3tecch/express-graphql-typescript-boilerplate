import { models } from 'models';

import { db } from '../../core/database';
import { UserError } from '../../core/graphql-error';
import { NotFound } from '../../common/errors';
import { AuthorModel } from '../../models/author.model';

import { Logger } from '../../core/logger';
const log = Logger('app:repositories:author:read');

const AuthorNotFound = NotFound(AuthorModel);

export const getAuthors = (): Promise<models.author.Instance[]> => AuthorModel.findAll();

export const getAuthor = async (id: number): Promise<models.author.Instance> => {
    const author = await AuthorModel.findById(id);
    if (author === null) {
        log.debug(AuthorNotFound(id));
        throw new UserError(AuthorNotFound(id));
    }
    return author;
};
