export const configuration: environment.Configuration = {
    host: 'localhost',
    port: process.env.PORT || '3030',
    database: 'sqlite://',
    debug: '',
    logger: {
        console: {
            level: 'none'
        }
    }
};
