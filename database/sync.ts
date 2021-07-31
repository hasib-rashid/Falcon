import GuildUser from "../models/GuildUser"
import MuteUser from '../models/MuteUser'
import BlackList from '../models/BlackListUsers'

export function Sync() {
    GuildUser.sync({ logging: false })
    MuteUser.sync({ logging: false })
    BlackList.sync({ logging: false })
}