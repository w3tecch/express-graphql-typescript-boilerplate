import * as Sequelize from 'sequelize';
import * as cls from 'continuation-local-storage';

import { Logger } from './logger';
const log = Logger('app:database');

import { configuration } from './environment';
const environment = configuration();


const namespace = cls.createNamespace('my-sequelize');
// Use template string because else typescript thinks this is a constant (even with normal strings)
Sequelize[`cls`] = namespace;

log.debug('Connecting to database %s', environment.url);
export const db = new Sequelize(environment.url, {
    // disable logging; default: console.log or false
    logging: log.debug
});
