/// <reference path="../all.d.ts" />

export const getEnv = (): string => {
    return process.env.NODE_ENV || 'development';
};

export const getConfig = (): config.Config => {
    return require(`../environments/${getEnv()}`).config;
};
