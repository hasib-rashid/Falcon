import GuildUser from "../models/GuildUser"
import MuteUser from '../models/MuteUser'

export function Sync() {
    GuildUser.sync({ logging: false })
    MuteUser.sync({ logging: false })
}