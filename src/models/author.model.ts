import * as Sequelize from 'sequelize';
import { models } from 'models';

import { db } from '../core/database';


export const AuthorModel: models.author.Model = db.define<models.author.Instance, models.author.Attributes>('Author', {
    firstName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    lastName: {
        type: Sequelize.STRING,
        allowNull: false
    }
});
