import * as winston from 'winston';

import { Environment } from './';


/**
 * Configures the winston logger. There are also file and remote transports available
 */
const logger = new winston.Logger({
    transports: [
        new winston.transports.Console({
            level: Environment.getConfig().logger.console.level,
            timestamp: Environment.isProduction(),
            handleExceptions: Environment.isProduction(),
            json: Environment.isProduction(),
            colorize: !Environment.isProduction()
        })
    ],
    exitOnError: false
});

const stream = (streamFunction) => ({
    'stream': streamFunction
});

const write = (writeFunction) => ({
    write: (message: string) => writeFunction(message)
});

/**
 * Winston logger stream for the morgan plugin
 */
export const winstonStream = stream(write(logger.info));

// Configure the debug module
process.env.DEBUG = Environment.getConfig().logger.debug;
// imports debug moduel
import * as Debug from 'debug';
const debug = Debug('app:response');

/**
 * Debug stream for the morgan plugin
 */
export const debugStream = stream(write(debug));

/**
 * Exports a wrapper for all the loggers we use in this configuration
 */
const format = (scope: string, message: string): string => `[${scope}] ${message}`;

const parse = (args: any[]) => (args.length > 0) ? args : '';

export const Logger = (scope: string) => {
    const scopeDebug = Debug(scope);
    return {
        debug: (message: string, ...args: any[]) => {
            if (Environment.isProduction()) {
                logger.debug(format(scope, message), parse(args));
            }
            scopeDebug(message, parse(args));
        },
        verbose: (message: string, ...args: any[]) => logger.verbose(format(scope, message), parse(args)),
        silly: (message: string, ...args: any[]) => logger.silly(format(scope, message), parse(args)),
        info: (message: string, ...args: any[]) => logger.info(format(scope, message), parse(args)),
        warn: (message: string, ...args: any[]) => logger.warn(format(scope, message), parse(args)),
        error: (message: string, ...args: any[]) => logger.error(format(scope, message), parse(args))
    };
};
