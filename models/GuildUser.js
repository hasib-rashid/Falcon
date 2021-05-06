const sequelize = require("sequelize")
const { DataTypes, Model } = require("sequelize")

module.exports = class GuildUser extends Model {
    static init(sequelize) {
        return super.init({
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
            },
        }, {
            tableName: "GuildUser",
            sequelize
        })
    }
}
