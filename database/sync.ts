import GuildUser from "../models/GuildUser"

export function Sync() {
    GuildUser.sync({ logging: false })
}