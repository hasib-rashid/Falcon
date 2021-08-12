import Command from '../../typings/command';
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

            client.giveaway.start(message.channel, {
                time: ms(args[0]),
                winnerCount: parseInt(args[1]),
                prize: args.slice(2).join(' '),
                messages: {
                    giveaway: '🎉🎉 **GIVEAWAY** 🎉🎉',
                    giveawayEnded: '🎉🎉 **GIVEAWAY ENDED** 🎉🎉',
                    timeRemaining: 'Time remaining: **{duration}**',
                    inviteToParticipate: 'React with 🎉 to participate!',
                    winMessage: 'Congratulations, {winners}! You won **{prize}**!\n{messageURL}',
                    embedFooter: 'Falcon Bot Giveaways',
                    noWinner: 'Giveaway cancelled, no valid participations.',
                    hostedBy: 'Hosted by: {user}',
                    winners: 'winner(s)',
                    endedAt: 'Ended at',
                    units: {
                        seconds: 'seconds',
                        minutes: 'minutes',
                        hours: 'hours',
                        days: 'days',
                        pluralS: false // Not needed, because units end with a S so it will automatically removed if the unit value is lower than 2
                    }
                }
            });            
    },
}

export default GiveawayCommand;