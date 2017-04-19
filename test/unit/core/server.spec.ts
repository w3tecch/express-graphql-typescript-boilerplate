import { Server } from '../../../src/core';


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
            let app;
            beforeEach(() => {
                app = {
                    listen: () => serverMock
                };
            });
            it('Should register a subscriber for the listening channel', () => {
                const spy = spyOn(serverMock, 'on');
                Server.run(<any>app, undefined);
                expect(spy).toHaveBeenCalled();
                expect(spy.calls.allArgs()[0][0]).toBe('listening');
            });
            it('Should call the onListening function', () => {
                const spy = spyOn(Server, 'onListening');
                Server.run(<any>app, undefined);
                serverMock.listening();
                expect(spy).toHaveBeenCalled();
            });
        });
        describe('error', () => {
            let app;
            beforeEach(() => {
                app = {
                    listen: () => serverMock
                };
            });
            it('Should register a subscriber for the error channel', () => {
                const spy = spyOn(serverMock, 'on');
                Server.run(<any>app, undefined);
                expect(spy).toHaveBeenCalled();
                expect(spy.calls.allArgs()[1][0]).toBe('error');
            });
            it('Should call the onError function', () => {
                const spy = spyOn(Server, 'onError');
                Server.run(<any>app, undefined);
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
            Server.onListening(serverMock);
            expect(spy).toHaveBeenCalled();
        });
        it('Should call the listening subscriber with the address as a Object', () => {
            const spy = spyOn(serverMock, 'address').and.returnValue({ port: 3000 });
            Server.onListening(serverMock);
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
                Server.onError(serverMock, new Error(msg));
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
                Server.onError(serverMock, error);
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
            Server.onError(serverMock, error);
            expect(spy).toHaveBeenCalledWith(1);
        });
        it('Should throw a normal error even if syscall property is defined with "listen"', () => {
            const msg = 'test';
            let error = new Error(msg);
            error['syscall'] = 'listen';
            error['code'] = 'EADDRINUSE';
            const spy = spyOn(process, 'exit');
            Server.onError(serverMock, error);
            expect(spy).toHaveBeenCalledWith(1);
        });
    });
});
