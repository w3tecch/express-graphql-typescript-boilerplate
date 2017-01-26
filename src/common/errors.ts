import * as Sequelize from 'sequelize';

const name = (model: Sequelize.Model<any, any>) => model['name'];

export const NotFound = (model: Sequelize.Model<any, any>) => (id?: number | string) => {
    return `${name(model)} with id ${id} does not exist`;
};
