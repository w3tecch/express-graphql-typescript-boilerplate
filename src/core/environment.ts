const name = (): string => process.env.NODE_ENV || 'development';

export const isTest = () => process.env.NODE_ENV === 'test';

export const isDevelopment = () => process.env.NODE_ENV === 'development';

export const isProduction = () => process.env.NODE_ENV === 'production';

export const configuration = (): environment.Configuration => require(`../environments/${name()}`).configuration;
