import { RunFunction } from '../../interfaces/Command';

export default {
    name: "ping",
    category: "info",
    description: "desc"
}

export const run: RunFunction = async (client, message) => {
	const msg = await message.channel.send('Ponging..');
	const ws: number = client.ws.ping;
	const edit: number = msg.createdTimestamp - message.createdTimestamp;
	await msg.edit(
		`WebSocket ping: \`${ws}\`MS, Discord API Ping: \`${edit}\`MS`
	);
};
