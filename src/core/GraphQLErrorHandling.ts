import * as uuid from 'uuid';
import {
    GraphQLType,
    GraphQLSchema,
    TypeMap,
    GraphQLObjectType,
    GraphQLFieldDefinitionMap,
    GraphQLFieldDefinition,
    GraphQLFieldResolveFn
} from 'graphql';

import { Environment } from './';
import { IsException } from '../exceptions';


// Mark field/type/schema
export const Processed = Symbol();

export class GraphQLErrorHandling {

    public static watch(schema: GraphQLSchema): void {
        this.maskSchema(schema);
    }

    private static maskSchema(schema: GraphQLSchema): void {
        const types: TypeMap = schema.getTypeMap();
        for (const typeName in types) {
            if (!Object.hasOwnProperty.call(types, typeName)) {
                continue;
            }
            this.maskType(types[typeName]);
        }
    }

    private static maskType(type: GraphQLType): void {
        const objectType: GraphQLObjectType = <GraphQLObjectType>type;
        if (objectType[Processed] || !objectType.getFields) {
            return;
        }

        const fields: GraphQLFieldDefinitionMap = objectType.getFields();
        for (const fieldName in fields) {
            if (!Object.hasOwnProperty.call(fields, fieldName)) {
                continue;
            }
            this.maskField(fields[fieldName]);
        }
    }

    private static maskField(field: GraphQLFieldDefinition): void {
        const resolveFn: GraphQLFieldResolveFn = field.resolve;
        if (field[Processed] || !resolveFn) {
            return;
        }

        field[Processed] = true;
        field.resolve = async (...args) => {
            try {
                const out = resolveFn.call(this, ...args);
                return await Promise.resolve(out);
            } catch (error) {
                throw this.handler(error);
            }
        };
    }

    private static handler(error: any): Error {
        if (error[IsException]) {
            return new Error(error.toString());
        }
        const errId = uuid.v4();
        error.message = `${error.message}: ${errId}`;
        if (!Environment.isTest()) {
            console.error(error && error.stack || error);
        }
        error.message = `InternalError:${errId}`;
        return error;
    }

}
