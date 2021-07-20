import Command from '../../constants/command';

const RemoveRRCommand: Command = {
    name: 'removeRR',
    description: 'Remove the ReactionRole from a previous message (removerr <messageID> <emoji>)',
    aliases: [
        ''
    ],
    guildOnly: false,
    ownerOnly: false,
    disabled: false,
    nsfw: false,
    cooldown: 0,

    async run(client, message, args) {

    },
}

export default RemoveRRCommand;