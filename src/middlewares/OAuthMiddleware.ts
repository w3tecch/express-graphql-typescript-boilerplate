import * as express from 'express';

import { Logger } from '../core';


const log = Logger('app:middleware:oauth');

export interface IOauthMiddlewareOptions {
}

const oauthMiddleware = (options: IOauthMiddlewareOptions) => (req: express.Request, res: express.Response, next: () => void) => {
    // To oauth-token logic here
    log.debug('oauthMiddleware was passed');
    next();
};

export const oauth = (options: IOauthMiddlewareOptions) => {
    // Possibility to handle options to configure this middleware
    log.debug('oauthMiddleware was registered');
    return oauthMiddleware(options);
};
