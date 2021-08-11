import { MessageEmbed, User } from 'discord.js';
import Command from '../../typings/command';
import { trimArray } from '../../util/Util';
import moment from 'moment'
import { default as axios } from 'axios'

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
            axios.get(`https://registry.npmjs.com/${args[0]}`).then((res) => {
                const { data } = res

                if (data.time.unpublished)
                    return message.channel.send("**This package no longer exists.**");
                const version = data.versions[data["dist-tags"].latest];
                const maintainers = trimArray(
                    data.maintainers.map((user: any) => user.name)
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
                    .setTitle(data.name)
                    .setURL(`https://www.npmjs.com/package/${args[0]}`)
                    .setDescription(data.description || "No description.")
                    .addField("❯ Version", data["dist-tags"].latest, true)
                    .addField("❯ License", data.license || "None", true)
                    .addField(
                        "❯ Author",
                        data.author ? data.author.name : "???",
                        true
                    )
                    .addField(
                        "❯ Creation Date",
                        moment.utc(data.time.created).format("MM/DD/YYYY h:mm A"),
                        true
                    )
                    .addField(
                        "❯ Modification Date",
                        moment.utc(data.time.modified).format("MM/DD/YYYY h:mm A"),
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
            })
        } catch (err) {
            if (err.status === 404)
                return message.channel.send("**Could not find any results.**");
            console.error(err);
        }
    },
}

export default NPMCommand;