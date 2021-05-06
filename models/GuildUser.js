const { DataTypes } = require("sequelize")
const sequelize = require("sequelize")

module.exports = () => {
    const GuildUser = sequelize.define("GuildUser", {
        userID: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        guildID: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        rank: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
    })
}