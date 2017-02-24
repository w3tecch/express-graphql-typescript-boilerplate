import { UserError } from '../core/graphql-error-handling';
import { NotFound } from './exceptions';

export const hasResults = <T>(list: T[]): boolean => list.length === 0;

export const assertResults = <T>(list: T[], idOrKey: number | string | number[]) => {
    if (hasResults(list)) {
        throw new UserError(NotFound(`${idOrKey}`));
    }
};


export const single = <T>(list: T[]): T => hasResults(list) ? null : list[0];

export const mapResults = <T, R>(list: T[], mapFn: (item: T) => R): R[] => list.map(item => mapFn(item));
