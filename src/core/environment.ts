/// <reference path="../all.d.ts" />

export const configuration = (): environment.Configuration => {
    return require(`../environments/${process.env.NODE_ENV}`).configuration;
};
