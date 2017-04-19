import { Exception } from './Exception';


export class ValidationException extends Exception {

    constructor(message?: string) {
        super(message);
    }

}
