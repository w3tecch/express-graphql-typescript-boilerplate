import * as uuid from 'uuid';
import { GraphQLObjectType, GraphQLSchema } from 'graphql';


// Mark field/type/schema
export const Processed = Symbol();

// Used to identify UserErrors
export const IsUserError = Symbol();

// UserErrors will be sent to the user
export class UserError extends Error {
    constructor(...args) {
        super(args[0]);
        this.name = 'Error';
        this.message = args[0];
        this[IsUserError] = true;
        Error.captureStackTrace(this);
    }
}

// Modifies errors before sending to the user
export let defaultHandler = (err?) => {
    if (err[IsUserError]) {
        return err;
    }
    const errId = uuid.v4();
    err.message = `${err.message}: ${errId}`;
    console.error(err && err.stack || err);
    err.message = `Internal Error: ${errId}`;
    return err;
};

const maskField = (field, fn) => {
    const resolveFn = field.resolve;
    if (field[Processed] || !resolveFn) {
        return;
    }

    field[Processed] = true;
    field.resolve = async (...args) => {
        try {
            const out = resolveFn.call(this, ...args);
            return await Promise.resolve(out);
        } catch (e) {
            throw fn(e);
        }
    };

    // save the original resolve function
    field.resolve._resolveFn = resolveFn;
};

const maskType = (type, fn) => {
    if (type[Processed] || !type.getFields) {
        return;
    }

    const fields = type.getFields();
    for (const fieldName in fields) {
        if (!Object.hasOwnProperty.call(fields, fieldName)) {
            continue;
        }
        maskField(fields[fieldName], fn);
    }
};

const maskSchema = (schema, fn) => {
    const types = schema.getTypeMap();
    for (const typeName in types) {
        if (!Object.hasOwnProperty.call(types, typeName)) {
            continue;
        }
        maskType(types[typeName], fn);
    }
};

// Changes the default error handler function
export const setDefaultHandler = (handlerFn) => {
    defaultHandler = handlerFn;
};

// Masks graphql schemas, types or individual fields
export const handlingErrors = (thing, fn = defaultHandler) => {
    if (thing instanceof GraphQLSchema) {
        maskSchema(thing, fn);
    } else if (thing instanceof GraphQLObjectType) {
        maskType(thing, fn);
    } else {
        maskField(thing, fn);
    }
};
