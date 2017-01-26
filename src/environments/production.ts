export const configuration: environment.Configuration = {
    host: 'my.address.any',
    port: process.env.PORT || '3000',
    database: 'mariadb://root:root@localhost:3306/my-prod-database',
    graphiql: false,
    debug: '',
    logger: {
        console: {
            level: 'debug'
        }
    }
};
