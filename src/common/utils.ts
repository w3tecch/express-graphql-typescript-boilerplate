import { UserError } from '../core/graphql-error-handling';
import { NotFound } from './exceptions';


export class Utils {

    static hasResults = <T>(list: T[]): boolean => list.length === 0;

    static assertResults = <T>(list: T[], idOrKey: number | string | number[]) => {
        if (Utils.hasResults(list)) {
            throw new UserError(NotFound(`${idOrKey}`));
        }
    }

    static single = <T>(list: T[]): T => Utils.hasResults(list) ? null : list[0];

}
