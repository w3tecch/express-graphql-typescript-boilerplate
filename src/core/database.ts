import { Logger } from './logger';
const log = Logger('app:database');

import { configuration } from './environment';
const environment = configuration();


log.debug('Connecting to database %s', environment.connection.split('@')[1]);

export const db = require('knex')({
    client: environment.client,
    connection: environment.connection,
    pool: { min: 0, max: 7 },
    migrations: {
        tableName: 'migrations'
    }
});
