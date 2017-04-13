import { Exception } from './Exception';


export class NotFoundException extends Exception {

    constructor(id?: number | string) {
        super(`Entity with identifier ${id} does not exist`);
        this.name = 'NotFoundException';
        this.key = 'e_not_found';
    }

}
