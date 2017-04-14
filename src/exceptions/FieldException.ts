import { Exception } from './Exception';


export class FieldException extends Exception {

    constructor(message: string) {
        super(message);
    }

}
