import {
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLString
} from 'graphql';

import { GraphQLErrorHandling, Processed } from '../../../src/core/GraphQLErrorHandling';
import { Exception } from '../../../src/exceptions';


describe('Core:GraphQLErrorHandling', () => {

    let schema;
    beforeEach(() => {
        // A simple graphql schema to run tests
        schema = new GraphQLSchema({
            query: new GraphQLObjectType({
                name: 'RootQueryType',
                fields: {
                    throwError: {
                        type: GraphQLString,
                        resolve(): void { throw new Error('secret error'); }
                    },
                    throwInPromise: {
                        type: GraphQLString,
                        resolve(): Promise<any> {
                            return new Promise(() => {
                                throw new Error('secret error');
                            });
                        }
                    },
                    throwUserError: {
                        type: GraphQLString,
                        resolve(): void { throw new Exception('custom error'); }
                    },
                    rejectPromise: {
                        type: GraphQLString,
                        resolve(): Promise<any> {
                            return new Promise((resolve, reject) => {
                                reject(new Error('secret error'));
                            });
                        }
                    }
                }
            })
        });
    });

    describe('User Error', () => {
        it('should extend Error type', () => {
            const msg = 'hello world';
            const err = new Exception(msg);
            expect(err instanceof Error);
            expect(err instanceof Exception);
            expect(err.message).toBe(msg);
        });
    });

    describe('handlingErrors', () => {
        it('should mask errors in fields', async (done) => {
            GraphQLErrorHandling.watch(schema);

            const field = schema.getTypeMap().RootQueryType.getFields().throwError;
            expect(field[Processed]).toEqual(true);

            try {
                await field.resolve();
                fail('Should throw a normal error');
            } catch (e) {
                expect(e.message).toContain('InternalError:');
            }
            done();
        });

        it('should mask errors in types', async (done) => {
            GraphQLErrorHandling.watch(schema);
            const fields = schema.getTypeMap().RootQueryType.getFields();

            for (const fieldName in fields) {
                if (!fields.hasOwnProperty(fieldName)) {
                    continue;
                }

                const field = fields[fieldName];
                expect(field[Processed]).toEqual(true);

                let resolveErr = null;
                try {
                    await field.resolve();
                } catch (e) {
                    resolveErr = e;
                }

                if (fieldName === 'throwUserError') {
                    expect(resolveErr.message).toContain('Exception');
                    expect(resolveErr.message).toContain('custom error');
                } else {
                    expect(resolveErr.message).toContain('InternalError:');
                }
            }
            done();
        });

        it('should mask errors in schema', async (done) => {
            GraphQLErrorHandling.watch(schema);
            const fields = schema.getTypeMap().RootQueryType.getFields();

            for (const fieldName in fields) {
                if (!fields.hasOwnProperty(fieldName)) {
                    continue;
                }

                const field = fields[fieldName];
                expect(field[Processed]).toEqual(true);

                let resolveErr = null;
                try {
                    await field.resolve();
                } catch (e) {
                    resolveErr = e;
                }

                if (fieldName === 'throwUserError') {
                    expect(resolveErr.message).toContain('Exception');
                    expect(resolveErr.message).toContain('custom error');
                } else {
                    expect(resolveErr.message).toContain('InternalError:');
                }
            }
            done();
        });
    });

});
