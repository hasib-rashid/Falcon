import { DataTypes, Model } from "sequelize"

interface GuildUserModel {
    userID: string,
    guildID: string,
    rank: number,
    rankCache: number,
    level: number
}

module.exports = class GuildUser extends Model {
    static guilduser(sequelize: any) {
        return this.init({
            userID: {
                type: DataTypes.STRING,
                allowNull: false
            },
            guildID: {
                type: DataTypes.STRING,
                allowNull: false
            },
            rank: {
                type: DataTypes.INTEGER,
            },
            rankCache: {
                type: DataTypes.INTEGER,
            },
            level: {
                type: DataTypes.INTEGER
            }
        }, {
            tableName: "GuildUser",
            sequelize
        })
    }
}