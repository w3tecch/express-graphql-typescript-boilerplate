import * as _ from 'lodash';

const config = require('./src/config');

_.forOwn(config, (value, key) => config[key] = value.database);

module.exports = config;
