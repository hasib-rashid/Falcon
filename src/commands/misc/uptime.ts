import Command from '../../constants/command';

const UptimeCommand: Command = {
    name: 'uptime',
    description: 'Check the uptime of Falcon',
    aliases: [
        ''
    ],
    guildOnly: false,
    ownerOnly: false,
    disabled: false,
    nsfw: false,
    cooldown: 0,

    async run(client, message, args) {
        // @ts-ignore
        let totalSeconds = client.uptime / 1000;
        let days = Math.floor(totalSeconds / 86400);
        let hours = Math.floor(totalSeconds / 3600);
        totalSeconds %= 3600;
        let minutes = Math.floor(totalSeconds / 60);
        let seconds = totalSeconds / 60;
        message.channel.send(
            `:low_brightness: **Uptime:** ${days} days, ${hours} hours and ${minutes} minutes!`
        );
    },
}

export default UptimeCommand;