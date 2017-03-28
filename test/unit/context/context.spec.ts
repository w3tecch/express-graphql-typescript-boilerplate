import { Context } from '../../../src/context/context';

describe('Context', () => {
    describe('Response', () => {
        it('should return the response object', () => {
            const res: any = 1;
            const context = new Context(undefined, res, undefined, undefined);
            expect(context.Response).toBe(1);
        });
    });
    describe('Request', () => {
        it('should return the request object', () => {
            const req: any = 1;
            const context = new Context(req, undefined, undefined, undefined);
            expect(context.Request).toBe(1);
        });
    });
    describe('Repositories', () => {
        it('should return the repositories object', () => {
            const repositories: any = 1;
            const context = new Context(undefined, undefined, repositories, undefined);
            expect(context.Repositories).toBe(1);
        });
    });
    describe('DataLoaders', () => {
        it('should return the dataLoaders object', () => {
            const dataLoaders: any = 1;
            const context = new Context(undefined, undefined, undefined, dataLoaders);
            expect(context.DataLoaders).toBe(1);
        });
    });
    describe('hasUserRoles', () => {
        it('should return the dataLoaders object', () => {
            const req: any = {
                acceptsLanguages: () => 'de'
            };
            const context = new Context(req, undefined, undefined, undefined);
            expect(context.getLanguage()).toBe('de');
        });
    });
    describe('hasUserRoles', () => {
        it('should return the request object', () => {
            const context = new Context(undefined, undefined, undefined, undefined);
            expect(context.hasUserRoles([])).toBeTruthy();
        });
    });
});
