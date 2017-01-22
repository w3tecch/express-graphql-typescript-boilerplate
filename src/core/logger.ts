import * as winston from 'winston';

import { configuration } from './environment';
const environment = configuration();

/**
 * Exports the winston logger
 */
export const logger = new winston.Logger({
    transports: [
        new winston.transports.Console({
            level: environment.logger.console.level,
            handleExceptions: process.env.NODE_ENV === 'production',
            json: process.env.NODE_ENV === 'production',
            colorize: process.env.NODE_ENV !== 'production'
        })
    ],
    exitOnError: false
});

const stream = (streamFunction) => ({
    'stream': streamFunction
});

const write = (writeFunction) => ({
    write: (message: string, encoding?: any) => writeFunction(message)
});

/**
 * Winston logger stream for the morgan plugin
 */
export const winstonStream = stream(write(logger.info));

/**
 * Debug stream for the morgan plugin
 */
import * as Debug from 'debug';
const debug = Debug('app:express');
export const debugStream = stream(write(debug));
