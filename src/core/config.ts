export = <config.Environments>{
    development: {
        connection: 'mysql://root:root@localhost:3306/my-database-dev',
        client: 'mysql',
        server: {
            host: 'localhost',
            port: process.env.PORT || '3000',
            graphiql: true
        },
        logger: {
            debug: 'app*',
            console: {
                level: 'error'
            }
        }
    },
    test: {
        connection: 'mysql://root:root@localhost:3306/my-database-test',
        client: 'mysql',
        server: {
            host: 'localhost',
            port: process.env.PORT || '3000',
            graphiql: false
        },
        logger: {
            debug: '',
            console: {
                level: 'none'
            }
        }
    },
    production: {
        connection: 'mariadb://root:root@localhost:3306/my-database-prod',
        client: 'mysql',
        server: {
            host: 'localhost',
            port: process.env.PORT || '3000',
            graphiql: false
        },
        logger: {
            debug: '',
            console: {
                level: 'debug'
            }
        }
    }
};
