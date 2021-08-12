import Command from '../../typings/command';
import Nuggies from 'nuggies'
import ms from 'ms'

const GiveawayCommand: Command = {
    name: 'giveaway',
    description: 'Drop a Prize Pool',
    aliases: [],
    guildOnly: false,
    ownerOnly: false,
    disabled: false,
    nsfw: false,
    cooldown: 0,

    async run(client, message, args) {
        if (!message.member?.hasPermission("MANAGE_MESSAGES"))
            return message.channel.send(
                "**You need `MANAGE_MESSAGES` permission to use this command**"
            );

            Nuggies.giveaways.create({
                message: message,
                prize: "Nitro",
                host: message.author.id,
                winners: 1,
                endAfter: "20s",
                requirements: "Nothing",
                channel: message.channel.id,
            });
    },
}

export default GiveawayCommand;