import dotenv from 'dotenv'
dotenv.config()

import { Sequelize, Model, DataTypes } from "sequelize";

const sequelize = new Sequelize(`mysql://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOSTNAME}:3306/${process.env.DB_NAME}`, { logging: false });

export default class GuildUser extends Model {
    public guildID!: string;
    public prefix?: string;
    public welcomeLog?: string;
    public welcomeMessage?: string;
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
            allowNull: false
        },
        welcomeLog: {
            type: DataTypes.STRING,
            allowNull: true
        },
        welcomeMessage: {
            type: DataTypes.STRING,
            allowNull: true
        },
        serverLog: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        modLogs: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        voiceLogs: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        }
    },
    {
        tableName: "guildmodel",
        sequelize,
    }
);