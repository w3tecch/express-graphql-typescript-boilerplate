/// <reference path="./../all.d.ts" />

import { logger, debugStream, winstonStream } from '../../src/core/logger';

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
    describe('logger', () => {
        it('Should have a debug method', () => {
            expect(logger.debug).toBeDefined();
        });
        it('Should have a log method', () => {
            expect(logger.log).toBeDefined();
        });
        it('Should have a info method', () => {
            expect(logger.info).toBeDefined();
        });
        it('Should have a warn method', () => {
            expect(logger.warn).toBeDefined();
        });
        it('Should have a error method', () => {
            expect(logger.error).toBeDefined();
        });
    });
});
