import {
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLString
} from 'graphql';

import {
    defaultHandler,
    handlingErrors,
    Processed,
    setDefaultHandler,
    UserError
} from '../../src/core/graphql-error';

describe('app:core', () => {

    let schema;
    beforeEach(() => {
        // A simple graphql schema to run tests
        schema = new GraphQLSchema({
            query: new GraphQLObjectType({
                name: 'RootQueryType',
                fields: {
                    throwError: {
                        type: GraphQLString,
                        resolve() { throw new Error('secret error'); }
                    },
                    throwInPromise: {
                        type: GraphQLString,
                        resolve() {
                            return new Promise(function () {
                                throw new Error('secret error');
                            });
                        }
                    },
                    throwUserError: {
                        type: GraphQLString,
                        resolve() { throw new UserError('custom error'); }
                    },
                    rejectPromise: {
                        type: GraphQLString,
                        resolve() {
                            return new Promise(function (resolve, reject) {
                                reject(new Error('secret error'));
                            });
                        }
                    }
                }
            })
        });
    });

    describe('User Error', function () {
        it('should extend Error type', function () {
            const msg = 'hello world';
            const err = new UserError(msg);
            expect(err instanceof Error);
            expect(err instanceof UserError);
            expect(err.message).toBe(msg);
        });
    });


    describe('Error Handler', function () {
        describe('defaultHandler', function () {
            it('should replace the message for normal errors', function () {
                const err = new Error('error-1');
                const masked = defaultHandler(err);
                expect(masked.message).toContain('Internal Error: ');
            });

            it('should not replace the message for UserErrors', function () {
                const err = new UserError('error-1');
                const masked = defaultHandler(err);
                expect(masked.message).toEqual('error-1');
            });
        });

        describe('setDefaultHandler', function () {
            const dh = defaultHandler;
            afterEach(() => setDefaultHandler(dh));

            it('should replace the default handler', function () {
                const fn = () => 'err';
                setDefaultHandler(fn);
                const res = defaultHandler();
                expect(res).toEqual('err');
            });
        });
    });

    describe('handlingErrors', function () {
        it('should mask errors in fields', async function () {
            const field = schema.getTypeMap().RootQueryType.getFields().throwError;
            handlingErrors(field);
            expect(field[Processed]).toEqual(true);
            let resolveErr = null;
            try {
                await field.resolve();
            } catch (e) {
                resolveErr = e;
            }
            expect(resolveErr.message).toContain('Internal Error: ');
        });

        it('should mask errors in types', async function () {
            const type = schema.getTypeMap().RootQueryType;
            const fields = schema.getTypeMap().RootQueryType.getFields();
            handlingErrors(type);

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
                    expect(resolveErr.message).toEqual('custom error');
                } else {
                    expect(resolveErr.message).toContain('Internal Error: ');
                }
            }
        });

        it('should mask errors in schema', async function () {
            const fields = schema.getTypeMap().RootQueryType.getFields();
            handlingErrors(schema);

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
                    expect(resolveErr.message).toEqual('custom error');
                } else {
                    expect(resolveErr.message).toContain('Internal Error: ');
                }
            }
        });
    });

});
