import * as express from 'express';


export class DefaultRoutes {

    static map(app: express.Application): void {
        app.use('/', (req: express.Request, res: express.Response) => {
            const pkg = require('../../package.json');
            res.json({
                name: pkg.name,
                version: pkg.version,
                description: pkg.description
            });
        });
    }

}


