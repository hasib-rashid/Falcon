import Command from '../../typings/command';

const VolumeCommand: Command = {
    name: 'volume',
    description: 'Set the volume',
    aliases: [
        'setVolume', 'set-volume'
    ],
    guildOnly: false,
    ownerOnly: false,
    disabled: false,
    nsfw: false,
    cooldown: 0,

    async run(client, message, args) {
        try {
            client.distube.setVolume(message, args[0]);
            message.channel.send(`**Volume set to \`${args[0]}\`!**`);
        } catch (err) {
            message.channel.send("**An unexpected Error Occured**");
        }
    },
}

export default VolumeCommand;