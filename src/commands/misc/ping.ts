import { Command, RunFunction } from '../../interfaces/Command'; 

const command: Command = {
	name: 'ping',
	category: 'misc',
	description: 'Check the ping of the websocket and the bot',
	usage: "PING PONG"
}

export const run: RunFunction = async (client, message, args) => {
	message.channel.send(`Websocket ping is ${client.ws.ping}`)
}

export default command