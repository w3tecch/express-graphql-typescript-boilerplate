import { UserError } from './user.error';


export class NotFoundError extends UserError {

    constructor(id?: number | string) {
        super(`Entity with identifier ${id} does not exist`);
        this.code = '601';
    }

}
