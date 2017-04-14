import { Exception } from './Exception';


export class ValidationException extends Exception {

    constructor(message?: string) {
        super(message);
        this.name = 'ValidationException';
        this.key = 'e_validation';
    }

}
