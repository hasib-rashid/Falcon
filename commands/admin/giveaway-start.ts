import Command from '../../constants/command';
//@ts-ignore
import Nuggies from 'nuggies'

const GiveawayStart: Command = {
    name: 'giveaway-start',
    description: 'Start a giveaway!',
    aliases: [
        ''
    ],
    guildOnly: false,
    ownerOnly: false,
    disabled: false,
    nsfw: false,
    cooldown: 0,

    async run(client, message, args) {
        Nuggies.giveaways.create({
            message: message,
            prize: 'test',
            host: message.author.id,
            winners: 1,
            endAfter: '20s',
            requirements: { enabled: false },
            channel: message.channel.id,
        });
    },
}

export default GiveawayStart;