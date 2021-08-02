import dotenv from 'dotenv'
dotenv.config()

import { Sequelize, Model, DataTypes } from "sequelize";

const sequelize = new Sequelize(`mysql://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOSTNAME}:3306/${process.env.DB_NAME}`, { logging: false });

export default class GuildUser extends Model {
    public userID!: string;
    public guildID!: string;
    public rank?: string | null;
    public rankCache?: number | null;
    public level?: number | null;
}

GuildUser.init(
    {
        userID: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        guildID: {
            type: DataTypes.STRING,
            allowNull: false
        },
        rank: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        rankCache: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        level: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        }
    },
    {
        tableName: "guilduser",
        sequelize,
    }
);