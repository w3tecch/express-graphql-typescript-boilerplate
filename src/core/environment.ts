const name = (): string => process.env.NODE_ENV || 'development';

export const configuration = (): environment.Configuration => require(`../environments/${name()}`).configuration;
