/// <reference path="../all.d.ts" />

export const config: config.Config = {
    host: 'localhost',
    port: process.env.PORT || '3000',
    database: 'mariadb://root:root@localhost:3306/my-dev-database',
    logger: {
        console: {
            level: 'info'
        }
    }
};
