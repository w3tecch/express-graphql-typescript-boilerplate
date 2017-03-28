import { UserError } from './user.error';


export class FieldError extends UserError {

    constructor(message: string) {
        super(message);
        this.code = '801';
    }

}
