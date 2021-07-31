import dotenv from 'dotenv'
dotenv.config()

import { Sequelize, Model, DataTypes } from "sequelize";

const sequelize = new Sequelize(`mysql://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOSTNAME}:3306/${process.env.DB_NAME}`, { logging: false });

export default class BlackListUser extends Model {
    public userID!: string;
    public reason?: string;
    public time!: number;
}

BlackListUser.init(
    {
        userID: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        reason: {
            type: DataTypes.STRING,
            allowNull: true
        },
        time: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },
    {
        tableName: "blacklist",
        sequelize,
    }
);