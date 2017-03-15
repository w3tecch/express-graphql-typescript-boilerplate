import * as Express from 'express';

import { RepositoriesContext } from './repositories-context';
import { DataLoadersContext } from './dataloaders-context';


export class Context {

    constructor(
        private request: Express.Request,
        private repsonse: Express.Response,
        private repositories: RepositoriesContext,
        private dataLoaders: DataLoadersContext
    ) { }

    public get Response() {
        return this.repsonse;
    }

    public get Request() {
        return this.request;
    }

    public get Repositories() {
        return this.repositories;
    }

    public get DataLoaders() {
        return this.dataLoaders;
    }

    public getLanguage() {
        return this.request.acceptsLanguages();
    }

    public hasUserRoles(roles: string[]): boolean {
        // TODO: Here you should check if the user as the needed roles for the requested query
        return true;
    }

}
