import * as express from 'express';
import * as GraphQLHTTP from 'express-graphql';

import { Environment, DB } from '../core';
import { Exception } from '../exceptions';
import { Schema } from '../schemas';
import { RootValue } from '../RootValue';
import {
    Context,
    DataLoadersContext,
    ServicesContext
} from '../context';
import {
    AuthorRepository,
    BookRepository
} from '../repositories';
import {
    BookService,
    AuthorService
} from '../services';


export class GraphQLRoutes {

    static map(app: express.Application): void {
        GraphQLRoutes.buildContext();

        // Add GraphQL to express route
        app.use('/graphql', (req: express.Request, res: express.Response) => {
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
    }

    private static buildContext(): void {
        ServicesContext.getInstance()
            .setBookService(new BookService(new BookRepository(DB)))
            .setAuthorService(new AuthorService(new AuthorRepository(DB)));

        DataLoadersContext.getInstance()
            .setAuthorDataLoader(ServicesContext.getInstance().AuthorService)
            .setBookDataLoader(ServicesContext.getInstance().BookService);
    }

}


