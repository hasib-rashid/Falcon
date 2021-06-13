import * as Sequelize from 'sequelize';
import { SequelizeAttributes } from '../typings/SequelizeAttribues/index';

export interface UserAttributes {
    id?: number;
    name: string;
    createdAt?: Date;
    updatedAt?: Date;
};


export const UserFactory = (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes): Sequelize.Model<UserInstance, UserAttributes> => {
    const attributes: SequelizeAttributes<UserAttributes> = {
        name: {
            type: DataTypes.
      }
    }
}