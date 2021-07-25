import Command from '../../constants/command';

const ChaosWordsCommand: Command = {
    name: 'chaoswords',
    description: 'Chaos words. Am I right? .....',
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

export default ChaosWordsCommand;