export = <config.Environments>{
    development: {
        url: 'mysql://root:root@localhost:3306/my-database',
        dialect: 'mysql',
        // username: 'root',
        // password: 'root',
        // host: 'localhost:3306',
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
        storage: '.ghost/test_database.sqlite',
        // url: 'sqlite://',
        dialect: 'sqlite',
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
        url: 'mariadb://root:root@localhost:3306/my-database',
        dialect: 'mariadb',
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
