/**
 * express-graphql-typescript-boilerplate
 *
 * @author Gery Hirscheld<@hirsch88>
 *
 * @description
 * This is a boilerplate for Node.js app written in TypeScript. We used the framework Express.js
 * as a basic layer and on that we setup the awesome GrapQL library.
 *
 */

// Core elements to get the server started
import {
    Environment,
    Server,
    winstonStream,
    debugStream
} from './core';

// Import all express libs
import * as helmet from 'helmet';
import * as morgan from 'morgan';
import * as cors from 'cors';

// Import our middlewares to add to the express chain
import { oauth } from './middlewares';

// Import all routes
import { DefaultRoutes, GraphQLRoutes } from './routes';

// Create a new express app
const app = Server.init();

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

// Our custom oauth middleware
app.use(oauth({}));

// Map routes to the express application
DefaultRoutes.map(app);
GraphQLRoutes.map(app);

// Starts the server and listens for common errors
Server.run(app, Environment.getConfig().server.port);
