module.exports = (sequelize, DataTypes) => {
    const GuildUser = sequelize.define("GuildUser", {
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        guildId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        rank: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });

    return GuildUser;
};