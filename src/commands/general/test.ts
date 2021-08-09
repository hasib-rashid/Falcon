import Command from '../../typings/command';
import { config } from 'dotenv'
config()
import { Deta } from 'deta'

const deta = Deta(process.env.DEFAULT_DB)
const db = deta.Base("test")

const testCommand: Command = {
    name: 'test',
    description: 'See the Ping of Falcon',
    aliases: [
        ''
    ],
    guildOnly: false,
    ownerOnly: false,
    disabled: false,
    nsfw: false,
    cooldown: 0,

    async run(client, message, args) {
        const data = await db.fetch({ "name": "hasib" })
        console.log(data)
    },
}

export default testCommand;