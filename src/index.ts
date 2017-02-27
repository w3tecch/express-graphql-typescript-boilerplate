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

// Enable cors for all routes and origins
app.use(cors());

// Adds winston logger to the express framework
app.use(morgan('dev', debugStream));
app.use(morgan('combined', winstonStream));


// Add GraphQL API to our express app
import { db } from './core/database';
import { schema } from './schemas';
import { RootValue } from './root-value';
import { Context } from './context';

import { AuthorRepository } from './repositories/author.repository';
import { BookRepository } from './repositories/book.repository';

// Requests to /graphql redirect to /
app.all('/graphql', (req, res) => res.redirect('/'));

app.use('/', (req: express.Request, res: express.Response) => {
    log.debug('Setup GraphQLHTTP');

    // Set all needed repositories and config a data loader within the setter
    const context = new Context(req, res)
        .setAuthorRepository(new AuthorRepository(db))
        .setBookRepository(new BookRepository(db));

    // Creates a GraphQLHTTP per request
    GraphQLHTTP({
        schema: schema,
        rootValue: new RootValue(),
        context: context,
        graphiql: environment.server.graphiql
    })(req, res);

});


// Starts the server and listens for common errors
const server = run(app, environment.server.port);
listenTo(server);
log.debug('Server was started on environment %s', name());
