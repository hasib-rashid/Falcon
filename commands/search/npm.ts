import { MessageEmbed, User } from 'discord.js';
import Command from '../../constants/command';
import { trimArray } from '../../util/Util';
import moment from 'moment'

const NPMCommand: Command = {
    name: 'npm',
    description: 'Search The Node Package Manager',
    aliases: [
        ''
    ],
    guildOnly: false,
    ownerOnly: false,
    disabled: false,
    nsfw: false,
    cooldown: 0,

    async run(client, message, args) {
        try {
            const { body } = await request.get(
                `https://registry.npmjs.com/${pkg}`
            );
            if (body.time.unpublished)
                return message.channel.send("**This package no longer exists.**");
            const version = body.versions[body["dist-tags"].latest];
            const maintainers = trimArray(
                body.maintainers.map((user: any) => user.name)
            );
            const dependencies = version.dependencies
                ? trimArray(Object.keys(version.dependencies))
                : null;
            const embed = new MessageEmbed()
                .setColor("BLUE")
                .setAuthor(
                    "NPM",
                    "https://i.imgur.com/ErKf5Y0.png",
                    "https://www.npmjs.com/"
                )
                .setTitle(body.name)
                .setURL(`https://www.npmjs.com/package/${pkg}`)
                .setDescription(body.description || "No description.")
                .addField("❯ Version", body["dist-tags"].latest, true)
                .addField("❯ License", body.license || "None", true)
                .addField(
                    "❯ Author",
                    body.author ? body.author.name : "???",
                    true
                )
                .addField(
                    "❯ Creation Date",
                    moment.utc(body.time.created).format("MM/DD/YYYY h:mm A"),
                    true
                )
                .addField(
                    "❯ Modification Date",
                    moment.utc(body.time.modified).format("MM/DD/YYYY h:mm A"),
                    true
                )
                .addField("❯ Main File", version.main || "index.js", true)
                .addField(
                    "❯ Dependencies",
                    dependencies && dependencies.length
                        ? dependencies.join(", ")
                        : "None"
                )
                .addField("❯ Maintainers", maintainers.join(", "));
            return message.channel.send(embed);
        } catch (err) {
            if (err.status === 404)
                return message.channel.send("**Could not find any results.**");
            console.error(err);
        }
    },
}

export default NPMCommand;