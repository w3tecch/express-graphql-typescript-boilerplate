/// <reference path="../all.d.ts" />

export const config: config.Config = {
    host: 'localhost',
    port: process.env.PORT || '3030',
    database: 'sqlite://',
    logger: {
        console: {
            level: 'error'
        }
    }
};
