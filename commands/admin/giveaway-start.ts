import Command from '../../constants/command';
//@ts-ignore
import Nuggies from 'nuggies';
import discordbuttons from 'discord-buttons'

const GiveawayStart: Command = {
    name: 'giveaway-start',
    description: 'Start a giveaway!',
    aliases: [
        'g-start',
        'gstart'
    ],
    guildOnly: false,
    ownerOnly: false,
    disabled: false,
    nsfw: false,
    cooldown: 0,

    async run(client, message, args) {
        Nuggies.giveaways.create({
            message: message,
            prize: args[0],
            host: message.author.id,
            winners: args[1],
            endAfter: args[2],
            requirements: args[3] || { enabled: false },
            channel: args[4] || message.channel.id,
        });

        client.on('clickButton', button => {
            Nuggies.buttonclick(client, button);
        });
    },
}

export default GiveawayStart;