import Command from '../../constants/command';

const TempMuteCommand: Command = {
    name: 'mute',
    description: 'Temporarily Mute a Member',
    aliases: [
        ''
    ],
    guildOnly: false,
    ownerOnly: false,
    disabled: false,
    nsfw: false,
    cooldown: 0,

    async run(client, message, args) {
        var time = "";
        var time2 = "";
        var time3 = "";
        if (!message.member?.hasPermission("ADMINISTRATOR"))
            return message.channel.send(
                "You don't have enough permissions to use this command."
            );

        let actual_duration_hours

        if (!args) {
            return message.channel.send(
                `You didn\'t state a duration or a price for the giveaway.`
            );
        }

        const stated_duration_hours: any = message.content.split(" ")[1];
        const stated_duration_hours2: any =
            stated_duration_hours.toLowerCase() || stated_duration_hours;
        if (stated_duration_hours2.includes("s")) {
            var time = "s";
        }
        if (stated_duration_hours2.includes("m")) {
            var time = "m";
        }
        if (stated_duration_hours2.includes("h")) {
            var time = "h";
        }
        if (stated_duration_hours2.includes("d")) {
            var time = "d";
        }
        const stated_duration_hours3: any = stated_duration_hours2.replace(time, "");
        if (stated_duration_hours3 === "0") {
            message.channel.send("The duration has to be atleast one.");
        }
        if (isNaN(stated_duration_hours3)) {
            message.channel.send(
                "The duration has to be a valid time variable."
            );
        }
        if (stated_duration_hours3 > 1) {
            var time3 = "s";
        }
        if (time === "s") {
            actual_duration_hours = stated_duration_hours3 * 1000;
        }
        if (time === "m") {
            actual_duration_hours = stated_duration_hours3 * 60000;
        }
        if (time === "h") {
            actual_duration_hours = stated_duration_hours3 * 3600000;
        }
        if (time === "d") {
            actual_duration_hours = stated_duration_hours3 * 86400000;
        }
        if (!isNaN(stated_duration_hours3)) {
            const prize = message.content.split(" ").slice(2).join(" ");
            if (prize === "")
                return message.channel.send("You have to enter a price.");
            if (stated_duration_hours3 !== "0") {
                setTimeout(() => {

                }, actual_duration_hours)
            }
        }
    },
}

export default TempMuteCommand;