import dotenv from 'dotenv'
dotenv.config()

import { Sequelize } from "sequelize";
import GuildUser from "../models/GuildUser";

export const dbConfig = new Sequelize(process.env.DB_NAME || "falcon", process.env.DB_USERNAME || "localhost", process.env.DB_PASSWORD || "root", {
    dialect: "mysql",
    host: process.env.DB_HOSTNAME,
    logging: false,
})

export const User = GuildUser(dbConfig);