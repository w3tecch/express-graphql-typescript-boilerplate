import {
    GraphQLScalarType,
    GraphQLError,
    StringValue
} from 'graphql';
import { Kind } from 'graphql/language';

import { FieldError } from '../../errors';

export const FIELD_ERROR_NO_DATE = 'Field error: value is not an instance of Date';
export const FIELD_ERROR_INVALID_DATE = 'Field error: value is an invalid Date';

export const GRAPHQL_ERROR_NO_STRING = (ast: StringValue | any) => 'Query error: Can only parse strings to dates but got a: ' + ast.kind;
export const GRAPHQL_ERROR_INVALID_DATE = 'Query error: Invalid date';
export const GRAPHQL_ERROR_INVALID_FORMAT = 'Query error: Invalid date format, only accepts: YYYY-MM-DDTHH:MM:SS.SSSZ';


const serializeDate = (value: Date | any) => {
    if (!(value instanceof Date)) {
        throw new FieldError(FIELD_ERROR_NO_DATE);
    }
    if (isNaN(value.getTime())) {
        throw new FieldError(FIELD_ERROR_INVALID_DATE);
    }
    return value.toJSON();
};

const parseValue = (value: string) => {
    if (typeof value !== 'string') {
        throw new FieldError(FIELD_ERROR_NO_DATE);
    }
    const date = new Date(value);
    if (isNaN(date.getTime())) {
        throw new FieldError(FIELD_ERROR_INVALID_DATE);
    }
    return date;
};

export const DateType = new GraphQLScalarType({
    name: 'Date',
    description: 'Represents a Date object',
    serialize: serializeDate,
    parseValue: parseValue,
    parseLiteral(ast: StringValue | any): Date {
        if (ast.kind !== Kind.STRING) {
            throw new GraphQLError(GRAPHQL_ERROR_NO_STRING(ast), [ast]);
        }
        let result = new Date(ast.value);
        if (isNaN(result.getTime())) {
            throw new GraphQLError(GRAPHQL_ERROR_INVALID_DATE, [ast]);
        }
        if (ast.value !== result.toJSON()) {
            throw new GraphQLError(GRAPHQL_ERROR_INVALID_FORMAT, [ast]);
        }
        return result;
    }
});
