import Command from '../../constants/command';

const WallpaperCommand: Command = {
    name: 'wallpaper',
    description: 'NSFW wallpaper',
    aliases: [
        ''
    ],
    guildOnly: false,
    ownerOnly: false,
    disabled: false,
    nsfw: true,
    cooldown: 0,

    async run(client, message, args) {

    },
}

export default WallpaperCommand;