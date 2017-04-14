import { Environment } from '../../../src/core/Environment';


describe('Core:Environment', () => {
    describe('getConfig', () => {
        it('Should return a config object', () => {
            expect(Environment.getConfig()).toBeDefined();
        });
    });
});
