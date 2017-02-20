import { listenTo, onListening, onError } from '../../src/core/server';
import * as Server from '../../src/core/server';

describe('Core:Server', () => {
    describe('listenTo', () => {
        let serverMock;
        beforeEach(() => {
            serverMock = {
                error: () => void 0,
                listening: () => void 0,
                on: (channel, fn) => {
                    switch (channel) {
                        case 'listening':
                            serverMock.listening = fn;
                            break;
                        case 'error':
                            serverMock.error = fn;
                            break;
                    }
                }
            };
        });
        describe('listening', () => {
            it('Should register a subscriber for the listening channel', () => {
                const spy = spyOn(serverMock, 'on');
                listenTo(serverMock);
                expect(spy).toHaveBeenCalled();
                expect(spy.calls.allArgs()[0][0]).toBe('listening');
            });
            it('Should call the onListening function', () => {
                const spy = spyOn(Server, 'onListening');
                listenTo(serverMock);
                serverMock.listening();
                expect(spy).toHaveBeenCalled();
            });
        });
        describe('error', () => {
            it('Should register a subscriber for the error channel', () => {
                const spy = spyOn(serverMock, 'on');
                listenTo(serverMock);
                expect(spy).toHaveBeenCalled();
                expect(spy.calls.allArgs()[1][0]).toBe('error');
            });
            it('Should call the onError function', () => {
                const spy = spyOn(Server, 'onError');
                listenTo(serverMock);
                serverMock.error(new Error('Test'));
                expect(spy).toHaveBeenCalled();
            });
        });
    });
    describe('onListening', () => {
        let serverMock;
        beforeEach(() => {
            serverMock = {
                address: () => 'address'
            };
        });
        it('Should call the listening subscriber with the address as a string', () => {
            const spy = spyOn(serverMock, 'address').and.returnValue('address');
            onListening(serverMock);
            expect(spy).toHaveBeenCalled();
        });
        it('Should call the listening subscriber with the address as a Object', () => {
            const spy = spyOn(serverMock, 'address').and.returnValue({ port: 3000 });
            onListening(serverMock);
            expect(spy).toHaveBeenCalled();
        });
    });
    describe('onError', () => {
        let serverMock;
        beforeEach(() => {
            serverMock = {
                address: () => 'address'
            };
        });
        it('Should throw a normal error', () => {
            const msg = 'test';
            try {
                onError(serverMock, new Error(msg));
                fail('Should have thrown an error');
            } catch (error) {
                expect(error.message).toBe(msg);
            }
        });
        it('Should throw a normal error even if syscall property is defined with "listen"', () => {
            const msg = 'test';
            let error = new Error(msg);
            error['syscall'] = 'listen';
            error['code'] = 'OTHER';
            try {
                onError(serverMock, error);
                fail('Should have thrown an error');
            } catch (error) {
                expect(error.message).toBe(msg);
            }
        });
        it('Should throw a normal error even if syscall property is defined with "listen"', () => {
            const msg = 'test';
            let error = new Error(msg);
            error['syscall'] = 'listen';
            error['code'] = 'EACCES';
            const spy = spyOn(process, 'exit');
            onError(serverMock, error);
            expect(spy).toHaveBeenCalledWith(1);
        });
        it('Should throw a normal error even if syscall property is defined with "listen"', () => {
            const msg = 'test';
            let error = new Error(msg);
            error['syscall'] = 'listen';
            error['code'] = 'EADDRINUSE';
            const spy = spyOn(process, 'exit');
            onError(serverMock, error);
            expect(spy).toHaveBeenCalledWith(1);
        });
    });
});
