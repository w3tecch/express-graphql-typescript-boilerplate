//See: https://medium.com/the-graphqlhub/your-first-graphql-server-3c766ab4f0a2#.giyyd9tzx

import * as express from 'express';
import * as morgan from 'morgan';
import * as cors from 'cors';
import * as http from 'http';

import * as Debug from 'debug';
const debug = Debug('app:utils:server');

import { logger } from './logger';

const bind = (addr) => {
    return typeof addr === 'string'
        ? `pipe ${addr}`
        : `port ${addr.port}`;
};

export const onListening = (server: http.Server) => {
    const addr = server.address();
    logger.info(`[Server] Listening on ${bind(addr)}`);
};

export const onError = (server: http.Server, error: Error) => {
    if (error['syscall'] !== 'listen') {
        throw error;
    }
    const addr = server.address();
    // handle specific listen errors with friendly messages
    switch (error['code']) {
        case 'EACCES':
            logger.error(`[Server] ${bind(addr)} requires elevated privileges`);
            process.exit(1);
            break;
        case 'EADDRINUSE':
            logger.error(`[Server] ${bind(addr)} is already in use`);
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
