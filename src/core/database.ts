import * as Knex from 'knex';

import { Logger } from './logger';
const log = Logger('app:database');

import { configuration } from './environment';
const environment = configuration();


log.debug('Connecting to database %s', environment.database.connection.split('@')[1]);

export const db: Knex = Knex({
    client: environment.database.client,
    connection: environment.database.connection,
    pool: { min: 0, max: 7 },
    migrations: {
        tableName: 'migrations'
    }
});
