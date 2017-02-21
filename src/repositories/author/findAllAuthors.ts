import { db } from '../../core/database';
import { AUTHOR } from '../../common/tables';


export const findAllAuthors = async () => {
    const results = await db
        .select()
        .from(AUTHOR);
    return results;
};
