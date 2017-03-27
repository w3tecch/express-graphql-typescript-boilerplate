import { configuration, name } from './core/environment';
import { Logger } from './core/logger';

// Import all express libs
import * as express from 'express';
import * as helmet from 'helmet';
import * as morgan from 'morgan';
import * as cors from 'cors';
import * as GraphQLHTTP from 'express-graphql';

// Application & Server from core to get the app started
import { listenTo } from './core/server';
import { init, run } from './core/bootstrap';

// Import local middlewares and core functions
import { winstonStream, debugStream } from './core/logger';

import { db } from './core/database';
import { UserError } from './errors/user.error';
import { schema } from './schemas';
import { RootValue } from './root-value';
import { Context } from './context/context';
import { RepositoriesContext } from './context/repositories-context';
import { DataLoadersContext } from './context/dataloaders-context';

import { AuthorRepository } from './repositories/author.repository';
import { BookRepository } from './repositories/book.repository';

const environment = configuration();


class App {

    private log = Logger('app:main');
    private express: express.Application;
    private repositoriesContext: RepositoriesContext;
    private dataLoadersContext: DataLoadersContext;

    constructor() {
        this.express = init();
        this.buildRepositoriesContext();
        this.buildDataLoadersContext();
    }

    public main(): void {
        this.configureSecurity();
        this.configureLogger();
        this.configureRoutes();
        this.configureGraphQl();

        // Starts the server and listens for common errors
        const server = run(this.express, environment.server.port);
        listenTo(server);
        this.log.debug('Server was started on environment %s', name());
    }

    private configureSecurity(): void {
        // Helmet helps you secure your Express apps by setting various HTTP headers
        this.express.use(helmet());
        this.express.use(helmet.noCache());
        this.express.use(helmet.hsts({
            maxAge: 31536000,
            includeSubdomains: true
        }));
        // Enable cors for all routes and origins
        this.express.use(cors());
    }

    private configureLogger(): void {
        // Adds winston logger to the express framework
        this.express.use(morgan('dev', debugStream));
        this.express.use(morgan('combined', winstonStream));
    }

    private configureRoutes(): void {
        // Requests to /graphql redirect to /
        this.express.all('/graphql', (req, res) => res.redirect('/'));
    }

    private configureGraphQl(): void {
        this.express.use('/', (req: express.Request, res: express.Response) => {
            this.log.debug('Setup GraphQLHTTP');

            // Creates a GraphQLHTTP per request
            GraphQLHTTP({
                schema: schema,
                rootValue: new RootValue(),
                context: new Context(req, res, this.repositoriesContext, this.dataLoadersContext),
                graphiql: environment.server.graphiql,
                formatError: error => ({
                    code: UserError.getErrorCode(error.message),
                    message: UserError.getErrorMessage(error.message),
                    path: error.path
                })
            })(req, res);

        });
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

export const app = new App();
