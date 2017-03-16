import { UserError } from './user.error';


export class ValidationError extends UserError {

    constructor(message: string) {
        super(message);
        this.code = '401';
    }

}
