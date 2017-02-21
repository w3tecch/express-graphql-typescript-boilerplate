const config = require('../../config');

export const name = (): string => process.env.NODE_ENV || 'development';

export const isTest = () => name() === 'test';

export const isDevelopment = () => name() === 'development';

export const isProduction = () => name() === 'production';

export const configuration = (): config.Configuration => config[name()];
