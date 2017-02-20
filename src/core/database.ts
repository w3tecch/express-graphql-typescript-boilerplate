import { Logger } from './logger';
const log = Logger('app:database');

import { configuration } from './environment';
const environment = configuration();

// environment.url
// log.debug('Connecting to database %s', environment.url);
