// Core elements to get the server started
import {
    Environment,
    Server,
    Logger,
    winstonStream,
    debugStream
} from './core';

// Import all express libs
import * as express from 'express';
import * as helmet from 'helmet';
import * as morgan from 'morgan';
import * as cors from 'cors';
import * as GraphQLHTTP from 'express-graphql';

import { Exception } from './exceptions';
import { Schema } from './schemas';
import { RootValue } from './RootValue';
import {
    Context,
    DataLoadersContext,
    ServicesContext
} from './context';
import { oauth } from './middlewares';


export class App {

    private static instance: App;

    private log = Logger('app:main');
    private express: express.Application;

    static getInstance(): App {
        if (!App.instance) {
            App.instance = new App();
        }
        return App.instance;
    }

    constructor() {
        this.express = Server.init();
    }

    public main(): void {

        // Helmet helps you secure your Express apps by setting various HTTP headers
        this.express.use(helmet());
        this.express.use(helmet.noCache());
        this.express.use(helmet.hsts({
            maxAge: 31536000,
            includeSubdomains: true
        }));

        // Enable cors for all routes and origins
        this.express.use(cors());

        // Adds winston logger to the express framework
        this.express.use(morgan('dev', debugStream));
        this.express.use(morgan('combined', winstonStream));

        // Our custom oauth middleware
        this.express.use(oauth({}));

        // Requests to /graphql redirect to /
        this.express.all('/graphql', (req, res) => res.redirect('/'));

        // Add GraphQL to express route
        this.express.use('/', (req: express.Request, res: express.Response) => {
            this.log.debug('Setup GraphQLHTTP');
            // Creates a GraphQLHTTP per request
            GraphQLHTTP({
                schema: Schema.get(),
                rootValue: new RootValue(),
                context: new Context(
                    req, res,
                    DataLoadersContext.getInstance(),
                    ServicesContext.getInstance()
                ),
                graphiql: Environment.getConfig().server.graphiql,
                formatError: exception => ({
                    name: Exception.getName(exception.message),
                    message: Exception.getMessage(exception.message),
                    path: exception.path
                })
            })(req, res);
        });

        // Starts the server and listens for common errors
        Server.run(this.express, Environment.getConfig().server.port);
        this.log.debug('Server was started on environment %s', Environment.getName());
    }

}
