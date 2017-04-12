import { UserException } from './UserException';


export class NotFoundException extends UserException {

    constructor(id?: number | string) {
        super(`Entity with identifier ${id} does not exist`);
        this.name = 'NotFoundException';
        this.code = '601';
    }

}
