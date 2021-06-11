import { BuildOptions, DataTypes, Model, Sequelize } from "sequelize";

export interface GuildUser {
    userID: string,
    guildID: string,
    rank: number
}
export interface UserModel extends Model<GuildUser>, GuildUser { }
export class User extends Model<UserModel, GuildUser> { }

export type UserStatic = typeof Model & {
    new(values?: object, options?: BuildOptions): UserModel;
};

export function UserFactory(sequelize: Sequelize): UserStatic {
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