// Core elements to get the server started
import {
    db,
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

import { UserError } from './errors';
import { Schema } from './schemas';
import { RootValue } from './root-value';
import { Context, RepositoriesContext, DataLoadersContext } from './context';
import { AuthorRepository, BookRepository } from './repositories';


export class App {

    private static instance: App;

    private log = Logger('app:main');
    private express: express.Application;
    private repositoriesContext: RepositoriesContext;
    private dataLoadersContext: DataLoadersContext;

    static getInstance(): App {
        if (!App.instance) {
            App.instance = new App();
        }
        return App.instance;
    }

    constructor() {
        this.express = Server.init();
        this.buildRepositoriesContext();
        this.buildDataLoadersContext();
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

        // Requests to /graphql redirect to /
        this.express.all('/graphql', (req, res) => res.redirect('/'));

        // Add GraphQL to express route
        this.express.use('/', (req: express.Request, res: express.Response) => {
            this.log.debug('Setup GraphQLHTTP');
            // Creates a GraphQLHTTP per request
            GraphQLHTTP({
                schema: Schema.getInstance().get(),
                rootValue: new RootValue(),
                context: new Context(req, res, this.repositoriesContext, this.dataLoadersContext),
                graphiql: Environment.getConfig().server.graphiql,
                formatError: error => ({
                    code: UserError.getErrorCode(error.message),
                    message: UserError.getErrorMessage(error.message),
                    path: error.path
                })
            })(req, res);
        });

        // Starts the server and listens for common errors
        Server.run(this.express, Environment.getConfig().server.port);
        this.log.debug('Server was started on environment %s', Environment.getName());
    }

    private buildRepositoriesContext(): void {
        this.repositoriesContext = new RepositoriesContext()
            .setAuthorRepository(new AuthorRepository(db))
            .setBookRepository(new BookRepository(db));
    }

    private buildDataLoadersContext(): void {
        this.dataLoadersContext = new DataLoadersContext()
            .setAuthorDataLoader(this.repositoriesContext.AuthorRepository)
            .setBookDataLoader(this.repositoriesContext.BookRepository);
    }

}
