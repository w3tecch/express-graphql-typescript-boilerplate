import { Environment } from '../../../src/core/environment';


describe('Core:Environment', () => {
    describe('getConfig', () => {
        it('Should return a config object', () => {
            expect(Environment.getConfig()).toBeDefined();
        });
    });
});
