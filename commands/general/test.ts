import Command from '../../constants/command';

const TestingCommand: Command = {
	name: 'test',
	description: 'description',
	aliases: [
		''
	],

	async run(client, message, args) {
		message.channel.send("Testing done")
	},
}

export default TestingCommand;