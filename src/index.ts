//See: https://medium.com/the-graphqlhub/your-first-graphql-server-3c766ab4f0a2#.giyyd9tzx

// Get environment configurations
import { configuration } from './core/environment';
const environment = configuration();

// Configure the debug module
process.env.DEBUG = environment.debug;
import * as Debug from 'debug';
const debug = Debug('app');

// Import all express libs
import * as express from 'express';
import * as helmet from 'helmet';
import * as morgan from 'morgan';
import * as cors from 'cors';

// Import local middlewares and core functions
import { winstonStream, debugStream } from './core/logger';

// Application & Server from core to get the app started
import { listenTo } from './core/server';
import { init, run } from './core/application';
const app = init();

// Helmet helps you secure your Express apps by setting various HTTP headers
app.use(helmet());

// Enable cors for all routes and origins
app.use(cors());

// Adds winston logger to the express framework
app.use(morgan('dev', debugStream));
app.use(morgan('combined', winstonStream));


// Defines Hello World test route
app.get('/', (req: express.Request, res: express.Response): void => {
    // this.log.info('Hello World called');
    debug('Hello World was called');
    res.send('Hello World');
});


// Starts the server and listens for common errors
const server = run(app, environment.port);
listenTo(server);
debug('Server was started');
