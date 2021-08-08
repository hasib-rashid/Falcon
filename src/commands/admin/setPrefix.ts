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

        const newPrefix = args.join(" ")

        if (!newPrefix) return message.channel.send("**Please Mention a prefix to set**")

        const prefix = await GuildModel.findOne({ where: { guildID: message.guild?.id } })
        // @ts-ignore
        const oldPrefix = prefix._previousDataValues.prefix
        // @ts-ignore
        if (prefix === null) {
            GuildModel.create({ guildID: message.guild?.id, prefix: args.join(" ") })
        } else {
            GuildModel.update({ prefix: args.join(" ") }, { where: { guildID: message.guild?.id } })
        }

        message.channel.send(`**Successfully Changed the server prefix from \`${oldPrefix}\` to \`${newPrefix}\`**`)
    },
}

export default SetPrefixCommand;