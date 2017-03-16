//See: https://medium.com/the-graphqlhub/your-first-graphql-server-3c766ab4f0a2#.giyyd9tzx

// Get environment configurations
import { configuration, name } from './core/environment';
const environment = configuration();

import { Logger } from './core/logger';
const log = Logger('app:main');

// Import all express libs
import * as express from 'express';
import * as helmet from 'helmet';
import * as morgan from 'morgan';
import * as cors from 'cors';
import * as GraphQLHTTP from 'express-graphql';

// Import local middlewares and core functions
import { winstonStream, debugStream } from './core/logger';

// Application & Server from core to get the app started
import { listenTo } from './core/server';
import { init, run } from './core/bootstrap';
const app = init();

// Helmet helps you secure your Express apps by setting various HTTP headers
app.use(helmet());
app.use(helmet.noCache());
app.use(helmet.hsts({
    maxAge: 31536000,
    includeSubdomains: true
}));

// Enable cors for all routes and origins
app.use(cors());

// Adds winston logger to the express framework
app.use(morgan('dev', debugStream));
app.use(morgan('combined', winstonStream));


// Requests to /graphql redirect to /
app.all('/graphql', (req, res) => res.redirect('/'));


// Add GraphQL API to our express app
import { db } from './core/database';
import { UserError } from './errors/user.error';
import { schema } from './schemas';
import { RootValue } from './root-value';
import { Context } from './context/context';
import { RepositoriesContext } from './context/repositories-context';
import { DataLoadersContext } from './context/dataloaders-context';

import { AuthorRepository } from './repositories/author.repository';
import { BookRepository } from './repositories/book.repository';


const repositoriesContext = new RepositoriesContext()
    .setAuthorRepository(new AuthorRepository(db))
    .setBookRepository(new BookRepository(db));

const dataLoadersContext = new DataLoadersContext()
    .setAuthorDataLoader(repositoriesContext.AuthorRepository)
    .setBookDataLoader(repositoriesContext.BookRepository);


app.use('/', (req: express.Request, res: express.Response) => {
    log.debug('Setup GraphQLHTTP');

    // Creates a GraphQLHTTP per request
    GraphQLHTTP({
        schema: schema,
        rootValue: new RootValue(),
        context: new Context(req, res, repositoriesContext, dataLoadersContext),
        graphiql: environment.server.graphiql,
        formatError: error => ({
            code: UserError.getErrorCode(error.message),
            message: UserError.getErrorMessage(error.message),
            path: error.path
        })
    })(req, res);

});


// Starts the server and listens for common errors
const server = run(app, environment.server.port);
listenTo(server);
log.debug('Server was started on environment %s', name());
