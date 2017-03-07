import { init, run } from '../../../src/core/bootstrap';

describe('Core:Bootstrap', () => {
    describe('init', () => {
        it('Should return a defined object', () => {
            expect(init()).toBeDefined();
        });
    });
    describe('run', () => {
        const appMock = {
            listen: (port) => port
        };
        let listenSpy;
        beforeEach(() => {
            listenSpy = spyOn(appMock, 'listen');
        });
        it('Should return a named pipe', () => {
            const namedPipe = 'testPort';
            run(appMock, namedPipe);
            expect(listenSpy).toHaveBeenCalledWith(namedPipe);
        });
        it('Should return undefined as undefined', () => {
            const port = 'undefined';
            run(appMock, port);
            expect(listenSpy).toHaveBeenCalledWith(port);
        });
        it('Should return null as null', () => {
            const port = 'null';
            run(appMock, port);
            expect(listenSpy).toHaveBeenCalledWith(port);
        });
        it('Should return the correct port number if the prot is >= 0', () => {
            const port = 0;
            run(appMock, port);
            expect(listenSpy).toHaveBeenCalledWith(port);
        });
        it('Should return false if there was a negative port number', () => {
            const port = -1;
            run(appMock, port);
            expect(listenSpy).toHaveBeenCalledWith(false);
        });
    });
});
