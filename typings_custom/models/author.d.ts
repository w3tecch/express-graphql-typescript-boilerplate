declare module 'models' {

    import * as Sequelize from 'sequelize';

    export namespace models {
        namespace author {

            interface Attributes {
                id?: number;
                firstName?: string;
                lastName?: string;
            }

            interface Instance extends Sequelize.Instance<Attributes>, Attributes {
            }

            interface Model extends Sequelize.Model<Instance, Attributes> {
            }

        }
    }
}
