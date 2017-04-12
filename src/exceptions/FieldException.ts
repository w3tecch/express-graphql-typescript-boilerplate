import { UserException } from './UserException';


export class FieldException extends UserException {

    constructor(message: string) {
        super(message);
        this.name = 'FieldException';
        this.code = '801';
    }

}
