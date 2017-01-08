/// <reference path="./all.d.ts" />
//See: https://medium.com/the-graphqlhub/your-first-graphql-server-3c766ab4f0a2#.giyyd9tzx

import * as express from 'express';
import * as morgan from 'morgan';
import * as Debug from 'debug';
import * as cors from 'cors';
import * as http from 'http';

import { logger, loggerStream } from './utils/logger';
import { getConfig } from './utils/config';

const debug = Debug('express-ts-boilerplate:server');

/**
 * The server class is the entry point our server app
 *
 * @export
 * @class Server
 */
export class Server {
    /**
     * Create expressjs application
     *
     * @memberOf Server
     */
    public app = express();
    /**
     * Http Server instance for the express lib
     *
     * @memberOf Server
     */
    public server: http.Server;
    /**
     * Port of the server
     *
     * @type {(number | string | boolean)}
     * @memberOf Server
     */
    public port: number | string | boolean = false;
    /**
     * Creats new instance of the server class
     *
     * @static
     * @returns {Server}
     *
     * @memberOf Server
     */
    public static bootstrap(): Server {
        return new Server();
    }
    /**
     * Normalizes the given port for the app
     *
     * @static
     * @param {string} val Port number
     * @returns {(number | string | boolean)}
     *
     * @memberOf Server
     */
    public static normalizePort(val: string): number | string | boolean {
        const parsedPort = parseInt(val, 10);
        // named pipe
        if (isNaN(parsedPort)) {
            return val;
        }
        // port number
        if (parsedPort >= 0) {

            return parsedPort;
        }
        return false;
    }
    /**
     * Constructor.
     *
     * @class Server
     * @constructor
     */
    constructor() {
        //configure application
        this.config();
        //configure routes
        this.routes();
    }
    /**
     *
     *
     *
     * @memberOf Server
     */
    public start(): void {
        //
        this.server = this.app.listen(Server.normalizePort(getConfig().port));
        //
        this.server.on('error', this.onError.bind(this));
        //
        this.server.on('listening', this.onListening.bind(this));
    }
    /**
     *
     *
     * @private
     *
     * @memberOf Server
     */
    private config(): void {
        // enable cors for all routes and origins
        this.app.use(cors());
        // adds winston logger to the express framework
        this.app.use(morgan('combined', { 'stream': loggerStream }));
    }
    /**
     *
     *
     * @private
     *
     * @memberOf Server
     */
    private routes(): void {
        // Define default route
        this.app.get('/', (req: express.Request, res: express.Response): void => {
            logger.info('Hello World called');
            res.send('Hello World');
        });
    }
    /**
     *
     *
     * @private
     *
     * @memberOf Server
     */
    private onListening() {
        const addr = this.server.address();
        const bind = typeof addr === 'string'
            ? `pipe ${addr}`
            : `port ${addr.port}`;

        debug(`Listening on ${bind}`);
        logger.info(`[Server] Listening on ${bind}`);
    }
    /**
     *
     *
     * @private
     * @param {any} error
     *
     * @memberOf Server
     */
    private onError(error: Error) {
        if (error['syscall'] !== 'listen') {
            throw error;
        }

        const bind = typeof this.port === 'string'
            ? `Pipe ${this.port}`
            : `Port ${this.port}`;

        // handle specific listen errors with friendly messages
        switch (error['code']) {
            case 'EACCES':
                logger.error(`[Server] ${bind} requires elevated privileges`);
                process.exit(1);
                break;
            case 'EADDRINUSE':
                logger.error(`[Server] ${bind} is already in use`);
                process.exit(1);
                break;
            default:
                throw error;
        }
    }
}

const serverInstance = Server.bootstrap();
export const server = serverInstance;
