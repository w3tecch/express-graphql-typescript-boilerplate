import { UserException } from './UserException';


export class ValidationException extends UserException {

    constructor(message: string) {
        super(message);
        this.name = 'ValidationException';
        this.code = '401';
    }

}
