import Command from '../../typings/command';

const StopCommand: Command = {
	name: 'stop',
	description: 'Stop the music and leave the voice channel',
	aliases: [''],
	guildOnly: false,
	ownerOnly: false,
	disabled: false,
	nsfw: false,
	cooldown: 0,

	async run(client, message, args) {
		client.distube.stop(message);
		message.channel.send('**Stopped the music and left the voice channel**');
	}
};

export default StopCommand;
