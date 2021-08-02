import Command from '../../constants/command';
import GuildModel from '../../models/GuildModel'

const SetPrefixCommand: Command = {
    name: 'setprefix',
    description: 'Set the prefix to something else',
    aliases: [
        'prefix', 'prefixset'
    ],
    guildOnly: false,
    ownerOnly: false,
    disabled: false,
    nsfw: false,
    cooldown: 0,

    async run(client, message, args) {
        const oldPrefix = client.prefix
        const newPrefix = args.join(" ")

        GuildModel.create({ guildID: message.guild?.id, prefix: args.join(" ") })
        message.channel.send(`**Successfully Changed the server prefix from \`${oldPrefix}\` to \`${newPrefix}\`**`)

    },
}

export default SetPrefixCommand;