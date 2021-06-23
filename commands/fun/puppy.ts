import Command from '../../constants/command';
import { MessageEmbed } from 'discord.js'
import { default as axios } from 'axios'
import consola from 'consola';

const PuppyCommand: Command = {
    name: 'puppy',
    description: 'Get the pic of a random puppy',
    aliases: [
        'dog'
    ],
    guildOnly: false,
    ownerOnly: false,
    disabled: false,
    nsfw: false,
    cooldown: 0,

    async run(client, message, args) {
        axios.get("https://dog.ceo/api/breeds/image/random").then((response) => {
            const embed = new MessageEmbed()
                .setAuthor(message.author.username, message.author.displayAvatarURL())
                .setTitle("Puppy!")
                .setDescription("Here's your random puppy!")
                .setColor("BLUE")
                .setImage(response.data.message);

            message.channel.send(embed);
        }).catch((err) => {
            consola.error(err)
        })
    },
}

export default PuppyCommand;