import { configuration, name } from '../../core/environment';
const environment = configuration();

import { Logger } from '../../core/logger';
const log = Logger('app:database:seed');

import { db } from '../../core/database';
import { AuthorModel } from '../../models/author.model';

log.debug('Starting on environment %s', name());

export const clean = async () => {
    await db.getQueryInterface().dropAllTables({ logging: false });
    log.debug('Dropped all tables');
    await AuthorModel.sync({ force: true, logging: false });
    log.debug('Synced AuthorModel to the database');
};

clean()
    .then(() => {
        log.debug('Finished');
        process.exit(0);
    })
    .catch((error) => {
        if (error['code'] === 'ECONNREFUSED') {
            log.error(error.name + ': ' + error.message);
        } else {
            log.error(error);
        }
        process.exit(1);
    });

