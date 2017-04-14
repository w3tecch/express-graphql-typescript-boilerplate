export class AbstractRepository<DB> {

    constructor(
        protected db: DB
    ) { }

}
