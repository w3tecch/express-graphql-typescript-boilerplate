const name = (): string => {
    return process.env.NODE_ENV || 'development';
};

export const configuration = (): environment.Configuration => {
    return require(`../environments/${name()}`).configuration;
};
