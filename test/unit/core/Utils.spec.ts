import { Utils } from '../../../src/core/Utils';


describe('Utils', () => {
    describe('hasResults', () => {
        it('should return true if the lenght is bigger than 1', () => {
            expect(Utils.hasResults([1])).toBeTruthy();
        });
        it('should return false if the lenght is 0', () => {
            expect(Utils.hasResults([])).toBeFalsy();
            expect(Utils.hasResults(null)).toBeFalsy();
            expect(Utils.hasResults(undefined)).toBeFalsy();
        });
    });
    describe('assertResult', () => {
        it('should do nothing if a result is given', () => {
            Utils.assertResult({}, 1);
            expect(true);
        });
        it('should throw an error if no result is given', () => {
            try {
                Utils.assertResult(null, 1);
            } catch (e) {
                expect(e);
            }
        });
    });
    describe('assertResults', () => {
        it('should do nothing if a result is given', () => {
            Utils.assertResults([1], 1);
            expect(true);
        });
        it('should throw an error if no result is given', () => {
            try {
                Utils.assertResults([], 1);
            } catch (e) {
                expect(e);
            }
        });
    });
    describe('single', () => {
        it('should return the first elment of an array', () => {
            let a = [1, 2];
            expect(Utils.single(a)).toBe(1);
        });
        it('should return null if the array is empty', () => {
            expect(Utils.single([])).toBe(null);
            expect(Utils.single(null)).toBe(null);
            expect(Utils.single(undefined)).toBe(null);
        });
    });
    describe('isPositve', () => {
        it('should return true if the given number is bigger or equal zero', () => {
            expect(Utils.isPositve(0)).toBeTruthy();
            expect(Utils.isPositve(1)).toBeTruthy();
        });
        it('should return false if the given number is below zero', () => {
            expect(Utils.isPositve(-1)).toBeFalsy();
        });
    });
});
