import Command from "../../Constants/Command";

const HelpCommand: Command = {
	name: "test",
	description: "Gets the Help Menu",
	aliases: [
		"test",
	],
	async run(client, message, args) {
		console.log("trigerred")
		console.log(client.prefix)
	},
};

export default HelpCommand;