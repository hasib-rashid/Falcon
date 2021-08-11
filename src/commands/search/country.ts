import Command from '../../typings/command';
import { default as axios } from 'axios'
import { formatNumber } from '../../util/Util';
import { MessageEmbed } from 'discord.js';

const CountryCommand: Command = {
    name: 'country',
    description: 'Peek at the information of a country!',
    aliases: [
        ''
    ],
    guildOnly: false,
    ownerOnly: false,
    disabled: false,
    nsfw: false,
    cooldown: 0,

    async run(client, message, args) {
        axios.get(`https://restcountries.eu/rest/v2/name/${args[0]}`).then(({ data }) => {
            const embed = new MessageEmbed()
                .setColor(0x00ae86)
                .setTitle(data.name)
                .setThumbnail(data[0].flag)
                .addField("❯ Population", formatNumber(data[0].population), true)
                .addField("❯ Capital", data[0].capital || "None", true)
                .addField("❯ Currency", data[0].currencies[0].symbol, true)
                .addField("❯ Location", data[0].subregion || data.region, true)
                .addField("❯ Demonym", data[0].demonym || "None", true)
                .addField("❯ Native Name", data[0].nativeName, true)
                .addField("❯ Area", `${formatNumber(data[0].area)}km`, true)
                .addField(
                    "❯ Languages",
                    data[0].languages.map((lang: any) => lang.name).join("/")
                );
            return message.channel.send(embed);
        })
    },
}

export default CountryCommand;