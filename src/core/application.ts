/// <reference path="../all.d.ts" />
//See: https://medium.com/the-graphqlhub/your-first-graphql-server-3c766ab4f0a2#.giyyd9tzx

import * as express from 'express';
import * as morgan from 'morgan';
import * as cors from 'cors';
import * as http from 'http';

import * as Debug from 'debug';
const debug = Debug('app:utils:application');

import { logger } from './logger';

const normalizePort = (val: string): number | string | boolean => {
    const parsedPort = parseInt(val, 10);
    if (isNaN(parsedPort)) { // named pipe
        return val;
    }
    if (parsedPort >= 0) { // port number
        return parsedPort;
    }
    return false;
};

export const init = () => express();

export const run = (app, port) => {
    port = normalizePort(port);
    debug('Starts server on port ', port);
    return app.listen(port);
};
