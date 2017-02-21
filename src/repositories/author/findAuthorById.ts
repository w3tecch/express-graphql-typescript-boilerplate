import { db } from '../../core/database';
import { UserError } from '../../core/graphql-error-handling';
import { AUTHOR } from '../../common/tables';
import { NotFound } from '../../common/exceptions';


export const findAuthorById = async (id: number) => {
    const results = await db
        .select()
        .from(AUTHOR)
        .where('id', id);

    if (results.length === 0) {
        throw new UserError(NotFound(id));
    }

    return results[0];
};
