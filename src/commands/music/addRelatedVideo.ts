import Command from '../../constants/command';

const AddRelatedVideoCommand: Command = {
    name: 'addRelatedVideo',
    description: 'Add A related Video',
    aliases: [
        'add-related-video'
    ],
    guildOnly: false,
    ownerOnly: false,
    disabled: false,
    nsfw: false,
    cooldown: 0,

    async run(client, message, args) {
        try {
            client.distube.addRelatedVideo(message);
        } catch (err) {
            message.channel.send("**You are not in a voice channel!**");
        }
    },
}

export default AddRelatedVideoCommand;