import { Logger, debugStream, winstonStream } from '../../../src/core/logger';

const log = Logger('test');


describe('Core:Logger', () => {
    describe('debugStream', () => {
        it('Should has a write property', () => {
            expect(debugStream.stream.write).toBeDefined();
        });
        it('Should not throw any error if calling the write method', () => {
            expect(debugStream.stream.write()).toBeUndefined();
        });
    });
    describe('winstonStream', () => {
        it('Should has a write property', () => {
            expect(winstonStream.stream.write).toBeDefined();
        });
        it('Should not throw any error if calling the write method', () => {
            expect(winstonStream.stream.write()).toBeUndefined();
        });
    });
    describe('log', () => {
        it('Should have a debug method', () => {
            expect(log.debug).toBeDefined();
        });
        it('Should have a verbose method', () => {
            expect(log.verbose).toBeDefined();
        });
        it('Should have a info method', () => {
            expect(log.info).toBeDefined();
        });
        it('Should have a warn method', () => {
            expect(log.warn).toBeDefined();
        });
        it('Should have a error method', () => {
            expect(log.error).toBeDefined();
        });
    });
});
