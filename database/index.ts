require("dotenv").config()

const { Sequelize } = require("sequelize")

module.exports = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    dialect: "mysql",
    host: process.env.DB_HOSTNAME,
    logging: false,
})