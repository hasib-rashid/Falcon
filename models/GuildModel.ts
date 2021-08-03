import dotenv from 'dotenv'
dotenv.config()

import { Sequelize, Model, DataTypes } from "sequelize";

const sequelize = new Sequelize(`mysql://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOSTNAME}:3306/${process.env.DB_NAME}`, { logging: false });

export default class GuildUser extends Model {
    public guildID!: string;
    public prefix?: string;
    public welcomeLog?: string;
    public welcomeMessage?: string;
    public goodbyeLog?: string;
    public goodbyeMessage?: string;
    public serverLog?: string;
    public modLogs?: string;
    public voiceLogs?: string;
}

GuildUser.init(
    {
        guildID: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        prefix: {
            type: DataTypes.STRING,
        },
        welcomeLog: {
            type: DataTypes.STRING,
        },
        welcomeMessage: {
            type: DataTypes.STRING,
        },
        serverLog: {
            type: DataTypes.INTEGER,
        },
        modLogs: {
            type: DataTypes.INTEGER,
        },
        voiceLogs: {
            type: DataTypes.INTEGER,
        }
    },
    {
        tableName: "guildmodel",
        sequelize,
    }
);