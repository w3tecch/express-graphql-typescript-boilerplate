//See: https://medium.com/the-graphqlhub/your-first-graphql-server-3c766ab4f0a2#.giyyd9tzx

import * as http from 'http';

import { Logger } from './logger';
const log = Logger('app:core:server');

const bind = (addr) => {
    return typeof addr === 'string'
        ? `pipe ${addr}`
        : `port ${addr.port}`;
};

export const onListening = (server: http.Server) => {
    log.debug(`Listening on ${bind(server.address())}`);
};

export const onError = (server: http.Server, error: Error) => {
    if (error['syscall'] !== 'listen') {
        throw error;
    }
    const addr = server.address();
    // handle specific listen errors with friendly messages
    switch (error['code']) {
        case 'EACCES':
            log.error(`${bind(addr)} requires elevated privileges`);
            process.exit(1);
            break;
        case 'EADDRINUSE':
            log.error(`${bind(addr)} is already in use`);
            process.exit(1);
            break;
        default:
            throw error;
    }
};

export const listenTo = (server: http.Server) => {
    server.on('listening', () => onListening(server));
    server.on('error', (error) => onError(server, error));
};
