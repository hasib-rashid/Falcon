import { BuildOptions, DataTypes, Model, Sequelize } from "sequelize";

interface GuildUser {
    userID: string,
    guildID: string,
    rank: number
}
interface UserModel extends Model<GuildUser>, GuildUser { }
class User extends Model<UserModel, GuildUser> { }

type UserStatic = typeof Model & {
    new(values?: object, options?: BuildOptions): UserModel;
};

export default function UserFactory(sequelize: Sequelize): UserStatic {
    return <UserStatic>sequelize.define("users", {
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
    });
}