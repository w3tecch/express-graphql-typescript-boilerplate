/// <reference path="../all.d.ts" />

import * as winston from 'winston';

import { getConfig } from './config';

/**
 * Exports the winston logger
 */
export const logger = new winston.Logger({
    transports: [
        new winston.transports.Console({
            level: getConfig().logger.console.level,
            handleExceptions: true,
            json: process.env.NODE_ENV === 'production',
            colorize: process.env.NODE_ENV !== 'production'
        })
    ],
    exitOnError: false
});

/**
 * Logger Stream for the morgan plugin
 */
export const loggerStream = {
    write: (message: string, encoding?: any) => {
        logger.info(message);
    }
};

/**
 * Logger Stream for the morgan plugin
 */
export const loggerSequelize = (message: string) => {
    logger.debug(message);
};
