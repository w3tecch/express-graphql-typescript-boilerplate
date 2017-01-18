/// <reference path="./../all.d.ts" />

import { configuration } from './../../src/core/environment';

describe('Core:Config', () => {
    describe('configuration', () => {
        it('Should return a config object', () => {
            expect(configuration()).toBeDefined();
        });
    });
});
