import * as Knex from 'knex';

import { Environment, Logger } from './';


const log = Logger('app:database');
log.debug('Connecting to database %s', Environment.getConfig().database.connection.split('@')[1]);

export const db: Knex = Knex({
    client: Environment.getConfig().database.client,
    connection: Environment.getConfig().database.connection,
    pool: { min: 0, max: 7 },
    migrations: {
        tableName: 'migrations'
    }
});
