//See: https://medium.com/the-graphqlhub/your-first-graphql-server-3c766ab4f0a2#.giyyd9tzx

import * as express from 'express';

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
    return app.listen(port);
};
