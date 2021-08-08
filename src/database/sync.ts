import MuteUser from '../models/MuteUser'
import BlackList from '../models/BlackListUsers'
import GuildModel from '../models/GuildModel'

export function Sync() {
    MuteUser.sync({ logging: false })
    BlackList.sync({ logging: false })
    GuildModel.sync({ logging: false })
}