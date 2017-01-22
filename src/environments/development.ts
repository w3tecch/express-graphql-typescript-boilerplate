export const configuration: environment.Configuration = {
    host: 'localhost',
    port: process.env.PORT || '3000',
    database: 'mariadb://root:root@localhost:3306/my-dev-database',
    graphiql: true,
    debug: 'app*',
    logger: {
        console: {
            level: 'error'
        }
    }
};
