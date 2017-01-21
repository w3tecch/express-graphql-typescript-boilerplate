// import { Server, server } from './../src/server';

// describe('server', () => {
//     describe('variable before starting the server', () => {
//         it('should have a express app', () => {
//             expect(server.app).toBeDefined();
//         });
//         it('should have a http server', () => {
//             expect(server.server).toBeUndefined();
//         });
//         it('should have a port variable', () => {
//             expect(server.port).toBeDefined();
//         });
//     });
//     describe('static methods', () => {
//         describe('bootstrap', () => {
//             it('should return a instance of the Server', () => {
//                 expect(server instanceof Server).toBeTruthy();
//                 expect(Server.bootstrap() instanceof Server).toBeTruthy();
//             });
//         });
//         describe('normalizePort', () => {
//             it('should return a named pipe', () => {
//                 expect(Server.normalizePort('')).toBe('');
//                expect(Server.normalizePort(null)).toBe(null);
//                 expect(Server.normalizePort(undefined)).toBe(undefined);
//                 expect(Server.normalizePort('a')).toBe('a');
//                 expect(Server.normalizePort('a1')).toBe('a1');
//             });
//             it('should return the correct port number', () => {
//                 expect(Server.normalizePort('1')).toBe(1);
//                 expect(Server.normalizePort('1000')).toBe(1000);
//             });
//             it('should return false if there was a negative or 0 port number', () => {
//                 expect(Server.normalizePort('0')).toBeFalsy();
//                 expect(Server.normalizePort('-100')).toBeFalsy();
//             });
//         });
//     });
//     describe('instance methods', () => {
//         // describe('start', () => {
//         //     it('should register at least one middleware to the express framework', () => {
//         //         const spy = spyOn(server.server, 'on');
//         //     });
//         // });
//         describe('config', () => {
//             it('should register at least one middleware to the express framework', () => {
//                 let spy = spyOn(server.app, 'use');
//                 server.config();
//                 expect(spy).toHaveBeenCalled();
//             });
//         });
//         describe('routes', () => {
//             it('should register the root route', () => {
//                 expect(server.app.route('/')).toBeDefined();
//             });
//         });
//         describe('onError', () => {
//             it('should throw an error if the syscall was not listen', () => {
//                 try {
//                     server.onError(new Error());
//                 } catch (error) {
//                     expect(error).toBeDefined();
//                 }
//             });
//             it('should throw an error if the code was not EACCES or EADDRINUSE', () => {
//                 let newError = new Error();
//                 newError['syscall'] = 'listen';
//                 try {
//                     server.onError(newError);
//                 } catch (error) {
//                     expect(error).toBeDefined();
//                 }
//             });
//         });
//     });
// });
